const UserServices = require('../services/UserServices')


// Sign up Controller

exports.signUpController = async ( req, res )=> {
    try {
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
    } catch (error) {
        console.log("file: UserController.js:5 ~ exports.Usercontroller= ~ error:", error.message)
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    }
}

// Sign In Controller

exports.signInController = async ( req, res )=> {
    try {
        const token = await UserServices.signIn(req.body)
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message:"User logged-in successfully!",
            data: {
                token:  token
            }
        })
    } catch (error) {
        console.log("file: UserController.js:5 ~ exports.Usercontroller= ~ error:", error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

 
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await UserServices.forgetPassword(
            email,
            req.protocol,
            req.get('host')
        );
        res.status(200).json({
            status: 'success',
            message: result.message,
        });
    } catch (error) {
        console.error('Forget password error:', error);

        res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong!',
        });
    }
};


// reset passswprd Controller.js
 
exports.resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
        const { jwtToken } = await UserServices.resetPassword(resetToken, password);
        res.status(200).json({
            status: "success",
            token: jwtToken
        });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

 
// password update controller

exports.changePasswordController = async ( req, res )=> {
    try {
        await UserServices.updatePssword(req.body,req.user)
        res.status(200).json({
            success: true,
            message:"Password updated successfully!",
        })
    } catch (error) {
        console.log("file: UserController.js:5 ~ exports.Usercontroller= ~ error:", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    }
}

 

// delete controller

exports.deleteAcountController = async ( req, res )=> {
    try {
        await UserServices.deleteAccount(req.user)
        res.status(200).json({
            success: true,
            message:"Account deleted successfully!",
        })
    } catch (error) {
        console.log("file: UserController.js:5 ~ exports.Usercontroller= ~ error:", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    }
}

 