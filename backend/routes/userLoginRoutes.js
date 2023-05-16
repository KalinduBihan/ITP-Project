const express = require("express");

const { userLogin, currentUser } = require("../controllers/userLoginController")
var { protect, logout } = require('../controllers/userProfileController.js');
const router = express.Router()

//user Login
router.post("/userLogin", userLogin)
router.get('/current-user', protect, currentUser)
router.get('/logout', protect, logout)

module.exports = router