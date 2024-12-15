const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')
const {authMiddleware}  = require('../middlewares/authMiddleware');


// sign up route
router.post('/users/signUp',UserController.signUpController);

// sign in route
router.post('/users/signIn',UserController.signInController);

// forget password
router.post('/users/forgetPassword',authMiddleware,UserController.forgetPassword);

// reset password
router.patch('/users/resetPassword/:resetToken',authMiddleware,UserController.resetPassword);

// update/change password
router.patch('/users/changePassword',authMiddleware,UserController.changePasswordController);

//delete me  
router.delete('/users/deleteMe',authMiddleware,UserController.deleteAcountController);


module.exports = router