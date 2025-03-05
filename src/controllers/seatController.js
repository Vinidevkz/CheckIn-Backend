
const {Session} = require('../models')
const {Seat} = require('../models')

class SeatController {

    static async createSeat(req, res){
        try {
            const {idSession, numberSeat, statusSeat, idUser} = req.body



            const newSeat = await Seat.create({
                idSession,
                numberSeat,
                statusSeat,
                idUser
            })

            res.status(201).json({message: 'Assento criada com sucesso!', newSeat})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", error: error.message, details: error})
        }
    }

    static async getSeat(req, res){
        try {
            const {idSeat} = req.body

            const oneSeat = await Seat.findOne({
                where: { idSeat },
                include: {
                    model: Session,
                    as: 'session'  
                }
            })

            if(!oneSeat){
                res.status(404).json({message: 'Id do assento incorreto.'})
                return
            }

            res.status(200).json({message: "Assento encontrada com sucesso.", Seat: oneSeat})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async updateSeat(req, res){
        try {
            const {idSeat, idSession, numberSeat, statusSeat, idUser} = req.body

            if(!idSeat){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingSeat = await Seat.findByPk(idSeat)
            
            if(!existingSeat){
                res.status(400).json({message: 'Assento inexistente.'})
                return
            }
    
            const updateData = {}
                if (idSeat) updateData.idSeat = idSeat
                if (idSession) updateData.idSession = idSession
                if (numberSeat) updateData.numberSeat = numberSeat
                if (statusSeat) updateData.statusSeat = statusSeat
                if (idUser) updateData.idUser = idUser

            await Seat.update(updateData, {
                where: {idSeat}
            })
    
            res.status(202).json({message: 'Assento alterado com sucesso.', Seat: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }

    static async deleteSeat(req, res){
        try {
            const {idSeat} = req.body

            const existingSeat = await Seat.findByPk(idSeat)
            
            if(!existingSeat){
                res.status(400).json({message: 'Assento inexistente.'})
                return
            }

            await Seat.destroy({
                where: {idSeat: idSeat}
            })

            res.status(200).json({message: 'Assento deletado com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async allSeats(req, res){
        try {
            const allSeats = await Seat.findAll()

            if(allSeats){
                res.status(202).json({message: 'Todas os assentos: ', Seats: allSeats})
            }else if(allSeats.length === 0){
                res.status(400).json({message: 'Não há assentos no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }
}

module.exports = SeatController