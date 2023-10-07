const express = require('express');
const userAuthController = require('../controllers/user/authenticationController');

const router = express.Router();

router.post('/login',userAuthController.loginUser)
router.get("/logout",userAuthController.logoutUser)

module.exports = router