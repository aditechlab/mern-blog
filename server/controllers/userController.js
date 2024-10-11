//===============Register user
// POST: api/users/register
//unprotected
const registerUser = (req, res, next) => {
    res.json('Register user');
}

//===============Login a Registered user
// POST: api/users/register
//unprotected
const loginUser = (req, res, next) => {
    res.json('Login user');
}

//===============View user profile
// POST: api/users/register
//protected
const getUserProfile = (req, res, next) => {
    res.json('User profile')
}

//===============Change user avatar(profile picture)
// POST: api/users/register
//protected
const changeUserAvatar = (req, res, next) => {
    res.json('change User Avatar profile')
}

//===============Edit User
// POST: api/users/register
//protected
const editUser = (req, res, next) => {
    res.json('change User Avatar profile')
}

//===============View Registered Authors
// POST: api/users/register
//protected
const getAuthors = (req, res, next) => {
    res.json('Get all users/authors');
}

module.exports = {
    registerUser, 
    loginUser, 
    getUserProfile, 
    changeUserAvatar,
    editUser, 
    getAuthors
}