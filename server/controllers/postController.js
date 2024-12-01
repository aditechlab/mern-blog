const HttpError = require('../models/errorModel')
const Post = require('../models/postModel')
var jwt = require('jsonwebtoken');

//===============Get Posts
// Get: api/posts/
//unprotected

const getPosts = async (req, res, next) => {
    res.json("Return all posts")
}


//===============Get Posts
// Get: api/posts/:id
//unprotected

const getSinglePosts = async (req, res, next) => {
    res.json("Return single post")
}

//===============Get Category Posts
// Get: api/posts/categories/:category
//unprotected

const getCategoryPosts = async (req, res, next) => {
    res.json("Return Category posts")
}

//===============Get Category Posts
// Get: api/posts/users/:id
//unprotected

const getAuthorPosts = async (req, res, next) => {
    res.json("Return author posts")
}

//===============Create a Post
// POST: api/posts/create
//protected

const createPost = async (req, res, next) => {
    try {
        const {title, category, description, avatar} = req.body
        if(!title || !category || !description || !creator){
            return next(new HttpError("Fill all fields", 422));
        }

        const userPost = user.req.id

        const newPost = await Post.create({title, category, description, creator:userPost});
        res.status(200).json(newPost);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===============Edit a Post
// Patch: api/posts/:id
//protected

const editPost = async (req, res, next) => {
    res.json("edit posts")
}

//===============Delete a Post
// delete: api/posts/:id
//protected

const deletePost = async (req, res, next) => {
    res.json("delete post")
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