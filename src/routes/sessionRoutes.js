const express = require('express')
const router = express.Router()
const SessionController = require('../controllers/sessionController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create Session
router.post('/sessions/create', SessionController.createSession)

//login Session
router.post('/sessions/get', SessionController.getSession)

//update Session
router.put('/sessions/update', Authenticate, SessionController.updateSession)

//delete Session
router.delete('/sessions/delete', Authenticate, SessionController.deleteSession)

//all Sessions
router.get('/sessions/allSessions', Authenticate, SessionController.allSessions)

module.exports = router