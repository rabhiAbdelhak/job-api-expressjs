const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {BadRequestError, UnauthenticatedError} = require('../errors');
require('dotenv').config();

const register = async (req , res ) => {
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({name : user.name ,success: true, token : user.getToken()});
}


const login  = async (req, res ) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('You have to provide your email and your password');
    }
    const user  = await User.findOne({email: email});
    if(user){
        if(await user.comparePassword(password)){
            const {id, username, name , email} = user
            const token = user.getToken();
            res.json({user : {id ,username, name , email} , token});
        }else{
            throw new BadRequestError('Wrong password !');
        }
    }else{
        throw new BadRequestError('Username does not exist');
    }
}




module.exports = {register, login}