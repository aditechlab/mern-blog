const HttpError = require('../models/errorModel')
const Post = require('../models/postModel')
var jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const upload = require('../config/upload');

//===============Get Posts
// Get: api/posts/
//unprotected

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error))
    }
}


//===============Get Posts
// Get: api/posts/:id
//unprotected

const getSinglePosts = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("No post found for this id", 404))
        }
        return res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===============Get Category Posts
// Get: api/posts/categories/:category
//unprotected

const getCategoryPosts = async (req, res, next) => {
    try {
        const {category} = req.params
        const catPosts = await Post.find({category}).sort({createdAt: -1});
        
        return res.status(200).json(catPosts)

    } catch (error) {
        return next(new HttpError(error))
    }
}

//===============Get Category Posts
// Get: api/posts/users/:id
//unprotected

const getAuthorPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const authorPosts = await Post.find({creator:id}).sort({createdAt:-1});
        return res.status(200).json(authorPosts);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===============Create a Post
// POST: api/posts/create
//protected

const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body
        if(!title || !category || !description){
            return next(new HttpError("Fill all fields", 422));
        }
        

        if (!req.file) {
            return next(new HttpError("Please choose an image", 422));
        }

        if(req.file.size > 2000000){
            return next(new HttpError("Thumbnail too big, file size should be less than 2MB.", 422))
        }
        const userPost = req.user.id

        const newPost = await Post.create({title, category, description, image:req.file.filename, creator:userPost});
        if(!newPost){
            return next(new HttpError("Post could not be created", 422))
        }

        //post counts
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts + 1;
        await User.findByIdAndUpdate(req.user.id, {posts:userPostCount})
        res.status(200).json(newPost);


        
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===============Edit a Post
// Patch: api/posts/:id
//protected
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, category, description } = req.body;

        // Validate fields
        if (!title || !category || !description || description.length < 12) {
            return next(new HttpError("Fill in all fields with valid data", 422));
        }

        let updatedPost;
        const oldPost = await Post.findById(postId);

        if (!oldPost) {
            return next(new HttpError("Post not found", 404));
        }

        if (oldPost.creator.toString() !== req.user.id) {
            return next(new HttpError("You are not authorized to edit this post", 403));
        }

        if (req.file) {
            // Validate file size
            if (req.file.size > 2000000) {
                return next(new HttpError("Thumbnail too big, file size should be less than 2MB.", 422));
            }

            // Delete old image
            const oldImagePath = path.join(__dirname, '..', 'uploads', oldPost.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image: ${err.message}`);
                }
            });

            // Update with new image
            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, category, description, image: req.file.filename },
                { new: true }
            );
        } else {
            // Update without changing the image
            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, category, description },
                { new: true }
            );
        }

        if (!updatedPost) {
            return next(new HttpError("Problem updating post", 422));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return next(new HttpError(error.message || "An error occurred", 500));
    }
};
//===============Delete a Post
// delete: api/posts/:id
//protected

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId){
            return next(new HttpError("Post unavailable", 400));
        }
        const post = await Post.findById(postId);
        //remove image
        const PostImage = post?.image;
        const ImagePath = path.join(__dirname, '..', 'uploads', PostImage);
            fs.unlink(ImagePath, async (err) => {
                if (err) {
                    return next(new HttpError(`Error deleting old image ${err.message}`));
                }else{
                    await Post.findByIdAndDelete(postId);

                  //reduce post count from the user
                    const currentUser = await User.findById(req.user.id);
                    const userPostCount = currentUser.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, {posts:userPostCount});
                    res.status(200).json("Post deleted successfully")
                }
            });
        
    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = { 
    getPosts, 
    getSinglePosts, 
    getCategoryPosts, 
    getAuthorPosts, 
    createPost,
    editPost,
    deletePost
}