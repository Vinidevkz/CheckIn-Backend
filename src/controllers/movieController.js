const {Movie} = require('../models')

class MovieController {

    static async createMovie(req, res){
        try {
            const {titleMovie, moviePoster, descMovie, dateLanc} = req.body

            if(!titleMovie || !descMovie || !dateLanc){
               res.status(400).json({message: 'Todos os campos são obrigatórios.'})
               return
            }

            const newMovie = await Movie.create({
                titleMovie,
                moviePoster,
                descMovie,
                dateLanc
            })

            res.status(201).json({message: 'Filme criado com sucesso!', newMovie})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", error: error.message, details: error})
        }
    }

    static async getMovie(req, res){
        try {
            const {idMovie} = req.body

            const oneMovie = await Movie.findOne({idMovie})

            if(!oneMovie){
                res.status(404).json({message: 'Id do filme incorreto.'})
                return
            }

            res.status(200).json({message: "Filme encontrado com sucesso.", Movie: oneMovie})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async updateMovie(req, res){
        try {
            const {idMovie, titleMovie, moviePoster, descMovie, dateLanc} = req.body

            if(!idMovie){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingMovie = await Movie.findByPk(idMovie)
            
            if(!existingMovie){
                res.status(400).json({message: 'Filme inexistente.'})
                return
            }
    
            const updateData = {}
                if (titleMovie) updateData.titleMovie = titleMovie
                if (moviePoster) updateData.moviePoster = moviePoster
                if (descMovie) updateData.descMovie = descMovie
                if (dateLanc) updateData.dateLanc = dateLanc

            await Movie.update(updateData, {
                where: {idMovie}
            })
    
            res.status(202).json({message: 'Filme alterado com sucesso.', Movie: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }

    static async deleteMovie(req, res){
        try {
            const {idMovie} = req.body

            const existingMovie = await Movie.findByPk(idMovie)
            
            if(!existingMovie){
                res.status(400).json({message: 'Filme inexistente.'})
                return
            }

            await Movie.destroy({
                where: {idMovie: idMovie}
            })

            res.status(200).json({message: 'Filme deletado com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async allMovies(req, res){
        try {
            const allMovies = await Movie.findAll()

            if(allMovies){
                res.status(202).json({message: 'Todos os filmes: ', Movies: allMovies})
            }else if(allMovies.length === 0){
                res.status(400).json({message: 'Não há filmes no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }

    static async latestMovies(req, res){
        try {
            const latestMovies = await Movie.findAll({
                order: [['createdAt', 'DESC']],
                limit: 10
            })

            return res.status(200).json({movies: latestMovies})
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar os filmes mais recentes.",
                error: error.message
            })
        }
    }
}

module.exports = MovieController