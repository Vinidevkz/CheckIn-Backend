const express = require('express')
const router = express.Router()
const UserSessionController = require('../controllers/userSessionsController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create userSession
router.post('/userSessions/create', Authenticate, UserSessionController.createUserSessions)

//get userSession
router.post('/userSessions/get', Authenticate, UserSessionController.getUserSessions)

//update userSession
//router.put('/userSessions/update', Authenticate, UserSessionController.updateuserSession)

//delete userSession
router.delete('/userSessions/delete', Authenticate, UserSessionController.deleteUserSessions)

//all userSessions
router.get('/userSessions/allUserSessions', Authenticate, UserSessionController.allUserSessions)

module.exports = router