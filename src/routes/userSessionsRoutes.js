const express = require('express')
const router = express.Router()
const UserSessionController = require('../controllers/userSessionsController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create userSession
router.post('/userSessions/create', Authenticate, UserSessionController.createUserSession)

//get userSession
router.post('/userSessions/get', Authenticate, UserSessionController.getUserSession)

//update userSession
//router.put('/userSessions/update', Authenticate, UserSessionController.updateuserSession)

//delete userSession
router.delete('/userSessions/delete', Authenticate, UserSessionController.deleteUserSession)

//all userSessions
router.get('/userSessions/allUserSessions', Authenticate, UserSessionController.allUserSessions)

module.exports = router