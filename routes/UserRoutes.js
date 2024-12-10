const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')


// sign up route
router.post('/signUp',UserController.signUpController);

// sign in route
router.post('/signIn',UserController.signInController);


module.exports = router