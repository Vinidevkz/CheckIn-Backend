
const {UserSessions, Session, Seat, Movie} = require('../models')

class UserSessionsController {

    static async createUserSessions(req, res){
        try {
            const {idSession, idSeat, priceTicket, idUser} = req.body

            const newUserSessions = await UserSessions.create({
                idSession,
                idSeat,
                priceTicket,
                idUser
            })

            res.status(201).json({message: 'Ingresso criado com sucesso!', newUserSessions})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", details: error.message})
        }
    }

    static async getUserSessions(req, res){
        try {
            const {idMySession} = req.body

            const oneUserSessions = await UserSessions.findByPk(idMySession, {
                include: [{
                    model: Session,
                    as: 'session',
                    include: [{
                        model: Movie,
                        as: 'movie',
                        attributes: ['titleMovie']
                    }]  
                },
                {
                    model: Seat,
                    as: 'seat'  
                }]
            })

            if(!oneUserSessions){
                res.status(404).json({message: 'Id do Ingresso incorreto.'})
                return
            }

            res.status(200).json({message: "Ingresso encontrado com sucesso.", UserSessions: oneUserSessions})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    /*
        static async updateUserSessions(req, res){
        try {
            const {idUserSessions, idSeat, numberUserSessions, statusUserSessions, idUser} = req.body

            if(!idUserSessions){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingUserSessions = await UserSessions.findByPk(idUserSessions)
            
            if(!existingUserSessions){
                res.status(400).json({message: 'Ingresso inexistente.'})
                return
            }
    
            const updateData = {}
                if (idUserSessions) updateData.idUserSessions = idUserSessions
                if (idSession) updateData.idSession = idSession
                if (numberUserSessions) updateData.numberUserSessions = numberUserSessions
                if (statusUserSessions) updateData.statusUserSessions = statusUserSessions
                if (idUser) updateData.idUser = idUser

            await UserSessions.update(updateData, {
                where: {idUserSessions}
            })
    
            res.status(202).json({message: 'Ingresso alterado com sucesso.', UserSessions: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }
    */

    static async deleteUserSessions(req, res){
        try {
            const {idUserSessions} = req.body

            const existingUserSessions = await UserSessions.findByPk(idUserSessions)
            
            if(!existingUserSessions){
                res.status(400).json({message: 'Ingresso inexistente.'})
                return
            }

            await UserSessions.destroy({
                where: {idMySession: idUserSessions}
            })

            res.status(200).json({message: 'Ingresso deletado com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async allUserSessions(req, res){
        try {
            const allUserSessionss = await UserSessions.findAll()

            if(allUserSessionss){
                res.status(202).json({message: 'Todas os Ingressos: ', UserSessionss: allUserSessionss})
            }else if(allUserSessionss.length === 0){
                res.status(400).json({message: 'Não há Ingressos no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }
}

module.exports = UserSessionsController