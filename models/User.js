const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must prived your name']
    },
    username: {
        type: String,
        required : [true, 'You must Provide a username'],
        minlength: [4, 'The username must be more then 4 letters'],
        unique: [true, 'This username exists, you have to change it with another!']
    },
    email: {
        type: String,
        required : [true, 'You must Provide a username'],
        unique: [true, 'This username exists, you have to change it with another!']
    },
    password : {
        type: String,
        minlength: [6, 'The password must be 6 caracters or moren solidify it please !']
    }

});

userSchema.pre('save',async  function(){
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.getToken = function(){
    const {id, name, email} = this
    const token = jwt.sign({user : {id , email, name}}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



module.exports = mongoose.model('User', userSchema);