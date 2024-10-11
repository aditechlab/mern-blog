const { Router } = require('express');

const {
    registerUser, 
    loginUser, 
    getUserProfile, 
    changeUserAvatar,
    editUser, 
    getAuthors
} = require('../controllers/userController');

const router = Router();

//define routes with http methos
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserProfile);
router.get('/', getAuthors);
router.post('/change-avatar', changeUserAvatar);
router.patch('/edit-user', editUser);

module.exports = router;