const express = require('express')
const router = express.Router()
const SeatController = require('../controllers/seatController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create Seat
router.post('/seats/create', Authenticate, SeatController.createSeat)

//get Seat
router.post('/seats/get', Authenticate, SeatController.getSeat)

//update Seat
router.put('/seats/update', Authenticate, SeatController.updateSeat)

//delete Seat
router.delete('/seats/delete', Authenticate, SeatController.deleteSeat)

//all Seats
router.get('/seats/allSeats', Authenticate, SeatController.allSeats)

//session Seats
router.post('/seats/sessionSeats', Authenticate, SeatController.getSessionSeats)

module.exports = router