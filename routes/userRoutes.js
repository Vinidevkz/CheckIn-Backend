const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

//create user
router.post('/users/logon', UserController.createUser)

//login user
router.post('/users/login', UserController.loginUser)

module.exports = router