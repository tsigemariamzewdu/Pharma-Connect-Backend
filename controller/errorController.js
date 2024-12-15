const customError = require('../utils/customError')
// Dev Errors
const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const castErrorHandler = (error) => {
    const message = `Invalid value  for ${error.path} : ${error.value}`
    new customError(message, 400)
}

const duplicatekeyErrorHandler = (error) => {
    const message = `Item with this id already exist.`
    new customError(message, 400)
}

const validationErrorHandler = (error) => {
    const messages = Object.values(error.errors).map(val => val.message).join(', ');
    return new customError(messages, 400);
}

// Production Errors
const ProdError = (res, error) =>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.',
        });
    }
}



module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error'
    
    if(process.env.NODE_ENV === 'development'){
        devErrors(res,error)
    } else if (process.env.NODE_ENV === 'production'){
        if(error.name === 'CastError') error = castErrorHandler(error);
        if(error.code === 11000) error = duplicatekeyErrorHandler(error);
        if(error.code === 11000) error = validationErrorHandler(error);

        ProdError(res,error)
    }
}