const {Session} = require('../models')
const {Movie} = require('../models')
const {Seat} = require('../models'); 

const {
    Model,
    Sequelize
  } = require('sequelize');


class SessionController {

    static async createSession(req, res){
        try {
            const {idMovie, cinemaSession, dateSession, hourSession, priceTicket} = req.body

            if(!idMovie || !cinemaSession || !dateSession || !priceTicket){
               res.status(400).json({message: 'Todos os campos são obrigatórios.'})
               return
            }

            const newSession = await Session.create({
                idMovie,
                cinemaSession,
                dateSession,
                hourSession,
                priceTicket
            })

            res.status(201).json({message: 'Sessão criada com sucesso!', newSession})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", error: error.message, details: error})
        }
    }

    static async getSession(req, res){
        try {
            const {idSession} = req.body

            const oneSession = await Session.findOne({
                where: { idSession },
                include: {
                    model: Movie,
                    as: 'movie'  
                }
            })

            if(!oneSession){
                res.status(404).json({message: 'Id do sessão incorreto.'})
                return
            }

            res.status(200).json({message: "Sessão encontrada com sucesso.", Session: oneSession})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async updateSession(req, res){
        try {
            const {idSession, idMovie, cinemaSession, dateSession, hourSession, priceTicket} = req.body

            if(!idSession){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingSession = await Session.findByPk(idSession)
            
            if(!existingSession){
                res.status(400).json({message: 'Sessão inexistente.'})
                return
            }
    
            const updateData = {}
                if (idMovie) updateData.idMovie = idMovie
                if (cinemaSession) updateData.cinemaSession = cinemaSession
                if (dateSession) updateData.dateSession = dateSession
                if (hourSession) updateData.hourSession = hourSession
                if (priceTicket) updateData.priceTicket = priceTicket

            await Session.update(updateData, {
                where: {idSession}
            })
    
            res.status(202).json({message: 'Sessão alterada com sucesso.', Session: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }

    static async deleteSession(req, res){
        try {
            const {idSession} = req.body

            const existingSession = await Session.findByPk(idSession)
            
            if(!existingSession){
                res.status(400).json({message: 'Sessão inexistente.'})
                return
            }

            await Session.destroy({
                where: {idSession: idSession}
            })

            res.status(200).json({message: 'Sessão deletada com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async getMovieSessions(req, res) {
        try {
            const { idMovie } = req.body;
    
            if (!idMovie) {
                return res.status(400).json({ message: "O campo 'idMovie' é obrigatório." });
            }
    
            const movieSessions = await Session.findAll({
                where: { idMovie },
                attributes: [
                    'idSession', 'cinemaSession', 'dateSession', 'hourSession', 'priceTicket',
                    [Sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM seats 
                        WHERE seats.idSession = Session.idSession 
                        AND seats.statusSeat = 0
                    )`), 'availableSeats']
                ]
            });
    
            if (movieSessions.length === 0) {
                return res.status(404).json({ message: "Nenhuma sessão encontrada para este filme." });
            }
    
            return res.status(200).json({ message: "Sessões do filme encontradas", sessions: movieSessions });
        } catch (error) {
            console.error("Erro ao buscar sessões:", error);
            return res.status(500).json({ message: "Erro interno no servidor", details: error.message });
        }
    }
    
    

    static async allSessions(req, res){
        try {
            const allSessions = await Session.findAll()

            if(allSessions){
                res.status(202).json({message: 'Todas as sessões: ', Sessions: allSessions})
            }else if(allSessions.length === 0){
                res.status(400).json({message: 'Não há sessões no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }
}

module.exports = SessionController