const { Router } = require('express');

const {
    registerUser, 
    loginUser, 
    getUserProfile, 
    changeUserAvatar,
    editUser, 
    getAuthors
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

//define routes with http methos
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserProfile);
router.get('/', getAuthors);
router.post('/change-avatar', authMiddleware, changeUserAvatar);
router.patch('/edit-user', editUser);

module.exports = router;