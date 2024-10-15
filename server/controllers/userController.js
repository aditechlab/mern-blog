const HttpError = require("../models/errorModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');



//===============Register user
// POST: api/users/register
//unprotected
const registerUser = async (req, res, next) => {
    try{
        //requests from user
        const {name, email, password, password2, avatar} = req.body;

        if(!name || !email || !password){
            return next(new HttpError("Fill all fields. ", 422));
        }

        //change email to lower case
        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email:newEmail});
        if(emailExists){
            return next(new HttpError('User with this email exists, use different email', 422));
        }

        if((password.trim()).length < 6){
            return next(new HttpError('Password must be atleast 6 characters and more. ', 422));
        }

        if(password != password2){
            return next(new HttpError("Passwords do not match!. ", 422));
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({name, email: newEmail, password: hashedPass});
        res.status(201).json(newUser);

    }catch(error){
        return next(new HttpError("User registration failed.", 422));
    }
}

//===============Login a Registered user
// POST: api/users/register
//unprotected
const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill in all fields. ", 422)); //validation
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail});
        if(!user){
           return next(new HttpError("Invalid email.", 422)); 
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass){
            return next(new HttpError("Invalid password.", 422));
        }

        //generate token
        const {_id : id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({id, name, token});

        

    }catch(error){
        return next(new HttpError("Login failed. Please check your credentials", 422));
    }
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