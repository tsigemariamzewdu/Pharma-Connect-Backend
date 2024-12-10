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
        res.status(201).json({
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
            message:"Something went wrong!",
            error:error.message
        })
    }
}

 