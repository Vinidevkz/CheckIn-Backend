const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController')

//middleware
const Authenticate = require('../middlewares/authJWT')

//create Movie
router.post('/movies/create', Authenticate, MovieController.createMovie)

//login Movie
router.post('/movies/get', Authenticate, MovieController.getMovie)

//update Movie
router.put('/movies/update', Authenticate, MovieController.updateMovie)

//delete Movie
router.delete('/movies/delete', Authenticate, MovieController.deleteMovie)

//all Movies
router.get('/movies/allMovies', Authenticate, MovieController.allMovies)

//latestMovies
router.post('/movies/latest', Authenticate, MovieController.latestMovies)

module.exports = router