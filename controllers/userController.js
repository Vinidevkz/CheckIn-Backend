const {User} = require('../models')

class userController {

    static async createUser(req, res){
        try {
            const {nameUser, emailUser, passwordUser, cpfUser, dataNasc} = req.body

            if(!nameUser || !emailUser || !passwordUser || !cpfUser || dataNasc){
               res.status(400).json({message: 'Informações incompletas.'})
            }

            const newUser = await User.create({
                nameUser,
                emailUser,
                passwordUser,
                cpfUser,
                dataNasc
            })
            res.status(201).json({message: 'Usuário criado com sucesso!', newUser})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async loginUser(req, res){
        try {
            const {emailUser, passwordUser} = req.body

            const logedUser = await User.findOne({emailUser, passwordUser})

            if(logedUser){
                res.status(202).json({message: 'Usuário logado com sucesso.', logedUser})
            }else{
                res.status(404).json({message: 'Email ou senhas incorretas.'})
            }
            
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.'})
        }
    }
}

module.exports = userController