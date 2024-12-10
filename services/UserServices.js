const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//signup

exports.signUp = async(userData) => {
    if (userData.password !== userData.confirmPassword){
        throw new Error("Confirimation password doesn't match");
    }

    const existingUser =await User.findOne({email: userData.email })
     
    if (existingUser){
        throw new Error("Email or Username already exist.");
    }

    const user = new User(userData); 
    await user.save();
    return user;
}

// sign in

exports.signIn = async (userData) => {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email }); 
    if (!existingUser) {
        throw new Error("Email does not exist.");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
        {
            id: existingUser._id,
            email: existingUser.email, 
            role: existingUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return token;
};
