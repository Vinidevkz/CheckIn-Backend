const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

//middleware
const Authenticate = require('../authConfig/authJWT')

//create user
router.post('/users/logon', UserController.createUser)

//login user
router.post('/users/login', UserController.loginUser)

//all users
router.get('/users/allUsers', UserController.allUsers)

module.exports = router