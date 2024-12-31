const UserServices = require('../services/userServices')
const asyncErrorHandler = require('../utils/asyncErrorHandler')


// Sign up Controller

exports.signUpController = asyncErrorHandler(async ( req, res )=> {
        const newUser =await UserServices.signUp(req.body)
        res.status(201).json({
            success: true,
            message:"User created successfully!",
            data: {
                user: {
                    username: newUser.username,
                    email: newUser.email,
                }
            }
        })
})

// Sign In Controller
// exports.signInController = asyncErrorHandler(async (req, res) => {
//     const token = await UserServices.signIn(req.body);

//     // Set the token in a cookie
//     res.cookie("authToken", token, {
//         httpOnly: true, // Prevent JavaScript from accessing the cookie
//         secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
//         sameSite: "Strict", // Prevent CSRF
//         maxAge: 24 * 60 * 60 * 1000, // 1-day expiry
//     });

//     res.status(200).json({
//         success: true,
//         message: "User logged in successfully!",
//     });
// });


exports.signInController = asyncErrorHandler (async ( req, res )=> {
        const token = await UserServices.signIn(req.body)
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message:"User logged-in successfully!",
            data: {
                token:  token
            }
        })
})
// note that this should be changed into cookie so that the the token can be sent automatically with out sending it on the header and then 
// we need to use both the access token and refresh token so that the user can stay logged in for more time thatn gn there is also and option for the 
// us to to increase the max age of the cookie which i think is easier and another thing that we need to cover is that how we can make the system be able to 

// forgot password controller

exports.forgetPassword = asyncErrorHandler (async (req, res) => {
        const { email } = req.body;
        const result = await UserServices.forgetPassword(
            email,
            req.protocol,
            req.get('host')
        );
        res.status(200).json({
            status: true,
            message: result.message,
        });
     
});


// reset passswprd Controller.js
 
exports.resetPassword =asyncErrorHandler (async (req, res) => {
        const { resetToken } = req.params;
        const { password } = req.body;
        const { jwtToken } = await UserServices.resetPassword(resetToken, password);
        res.status(200).json({
            status: true,
            token: jwtToken
        });
});

 
// password update controller

exports.changePasswordController =asyncErrorHandler (async ( req, res )=> {
        await UserServices.updatePssword(req.body,req.user)
        res.status(200).json({
            success: true,
            message:"Password updated successfully!",
        })
})

 

// delete controller

exports.deleteAcountController =asyncErrorHandler (async ( req, res )=> {
        await UserServices.deleteAccount(req.user)
        res.status(200).json({
            success: true,
            message:"Account deleted successfully!",
        })
})

 