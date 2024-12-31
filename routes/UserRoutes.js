const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')
const {authMiddleware}  = require('../middlewares/authMiddleware');


// sign up route
router.post('/signUp',UserController.signUpController);

// sign in route
router.post('/signIn',UserController.signInController);

// forget password
router.post('/forgetPassword',authMiddleware,UserController.forgetPassword);

// reset password
router.patch('/resetPassword/:resetToken',authMiddleware,UserController.resetPassword);

// update/change password
router.patch('/changePassword',authMiddleware,UserController.changePasswordController);

//delete me  
router.delete('/deleteMe',authMiddleware,UserController.deleteAcountController);


module.exports = router