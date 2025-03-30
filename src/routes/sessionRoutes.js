const express = require('express')
const router = express.Router()
const SessionController = require('../controllers/sessionController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create Session
router.post('/sessions/create', Authenticate, SessionController.createSession)

//get Session
router.post('/sessions/get', Authenticate, SessionController.getSession)

//update Session
router.put('/sessions/update', Authenticate, SessionController.updateSession)

//delete Session
router.delete('/sessions/delete', Authenticate, SessionController.deleteSession)

//movie Sessions
router.post('/sessions/movieSessions', SessionController.getMovieSessions)

//all Sessions
router.get('/sessions/allSessions', SessionController.allSessions)

module.exports = router