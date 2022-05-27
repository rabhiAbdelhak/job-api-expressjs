const jwt = require ('jsonwebtoken');
const { BadRequestError, UnauthenticatedError } = require('../errors');


const autheticationMiddleware  = ( req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Unauthorozed Action')
    }
    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log(decoded)
        next();
    }catch(err){
        throw new UnauthenticatedError('Unauthorozed Action')
    }
    
}

module.exports = {autheticationMiddleware}