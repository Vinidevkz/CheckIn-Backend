const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

//middleware
const Authenticate = require('../authConfig/authJWT')

//create user
router.post('/users/logon', UserController.createUser)

//login user
router.post('/users/login', Authenticate, UserController.loginUser)

//update user
router.put('/users/update', Authenticate, UserController.updateUser)

//delete user
router.delete('/users/delete', Authenticate, UserController.deleteUser)

//all users
router.get('/users/allUsers', Authenticate, UserController.allUsers)

module.exports = router