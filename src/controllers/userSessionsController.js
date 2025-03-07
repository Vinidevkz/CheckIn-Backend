
const {Session} = require('../models')
const {UserSession} = require('../models')

class UserSessionController {

    static async createUserSession(req, res){
        try {
            const {idSession, idSeat, priceTicket, idUser} = req.body

            const newUserSession = await UserSession.create({
                idSession,
                idSeat,
                priceTicket,
                idUser
            })

            res.status(201).json({message: 'Ingresso criado com sucesso!', newUserSession})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", error: error.message, details: error})
        }
    }

    static async getUserSession(req, res){
        try {
            const {idUserSession} = req.body

            const oneUserSession = await UserSession.findOne({
                where: { idMySession },
                include: [{
                    model: Session,
                    as: 'session'  
                },
                {
                    model: Seat,
                    as: 'seat'  
                }]
            })

            if(!oneUserSession){
                res.status(404).json({message: 'Id do Ingresso incorreto.'})
                return
            }

            res.status(200).json({message: "Ingresso encontrado com sucesso.", UserSession: oneUserSession})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    /*
        static async updateUserSession(req, res){
        try {
            const {idUserSession, idSeat, numberUserSession, statusUserSession, idUser} = req.body

            if(!idUserSession){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingUserSession = await UserSession.findByPk(idUserSession)
            
            if(!existingUserSession){
                res.status(400).json({message: 'Ingresso inexistente.'})
                return
            }
    
            const updateData = {}
                if (idUserSession) updateData.idUserSession = idUserSession
                if (idSession) updateData.idSession = idSession
                if (numberUserSession) updateData.numberUserSession = numberUserSession
                if (statusUserSession) updateData.statusUserSession = statusUserSession
                if (idUser) updateData.idUser = idUser

            await UserSession.update(updateData, {
                where: {idUserSession}
            })
    
            res.status(202).json({message: 'Ingresso alterado com sucesso.', UserSession: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }
    */

    static async deleteUserSession(req, res){
        try {
            const {idUserSession} = req.body

            const existingUserSession = await UserSession.findByPk(idUserSession)
            
            if(!existingUserSession){
                res.status(400).json({message: 'Ingresso inexistente.'})
                return
            }

            await UserSession.destroy({
                where: {idMySession: idUserSession}
            })

            res.status(200).json({message: 'Ingresso deletado com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async allUserSessions(req, res){
        try {
            const allUserSessions = await UserSession.findAll()

            if(allUserSessions){
                res.status(202).json({message: 'Todas os Ingressos: ', UserSessions: allUserSessions})
            }else if(allUserSessions.length === 0){
                res.status(400).json({message: 'Não há Ingressos no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }
}

module.exports = UserSessionController