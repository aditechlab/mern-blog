const express = require('express');

const { 
    getPosts, 
    getSinglePosts, 
    getCategoryPosts, 
    getAuthorPosts, 
    createPost,
    editPost,
    deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

//define routes methods
router.get('/', getPosts);
router.get('/:id', getSinglePosts);
router.get('/categories/:category', getCategoryPosts);
router.get('/users/:id', getAuthorPosts);
router.post('/create', authMiddleware, createPost);
router.patch('/edit-post', authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost)

module.exports = router;