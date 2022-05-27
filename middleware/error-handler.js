const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {

  customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || 'Something went wrong , try again later !',
  }
  
  if(err.name === 'CastError'){
    customError.statusCode = 404;
    customError.msg = 'No Item with the provided ID is available !'
  }

  if(err.name === 'ValidationError'){
     const errors = Object.values(err.errors).reduce((accu, item) => {
        return {...accu, [item.path] : item.message}
    }, {});
    customError.statusCode = 400;
    customError.msg = {...errors};
  }

  if(err.code && err.code === 11000){
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `${Object.keys(err.keyValue)} is already in use !`;
  }
 res.status(customError.statusCode).json({error: true, msg: customError.msg});
}



module.exports = errorHandlerMiddleware;