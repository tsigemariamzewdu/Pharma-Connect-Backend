const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')


exports.authMiddleware = async ( req, res, next ) => {
    // 1. Check if authorization header exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new Error("You are not logged in."));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new Error("You are not logged in."));
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const user =await User.findOne({username : decodedToken.username})
    
    if(!user){
        next(new customError("The user with the given token does not exist", 401))
    }

    req.user = {
        userid: decodedToken.id,
        email:decodedToken.email,
        role: decodedToken.role,
    }

    next()

}  

// authenticate admins 
exports.restrict =(role)=>{ ///(...roles)
    return (req,res,next)=>{
        if (!req.user.role === role){
            next(new Error("Only admins are authorized."))
        }
        next()
}}