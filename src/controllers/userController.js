const {User} = require('../models')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const generateToken = () => {
    const payload = {
        id: User.idUser,
        email: User.emailUser
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return token
}

class userController {

    static async createUser(req, res){
        try {
            const {nameUser, emailUser, passwordUser, cpfUser, dataNasc} = req.body

            if(!nameUser || !emailUser || !passwordUser || !cpfUser || !dataNasc){
               res.status(400).json({message: 'Todos os campos são obrigatórios.'})
               return
            }

            const hashedPassword = await bcrypt.hash(passwordUser, 10)

            const newUser = await User.create({

                nameUser,
                emailUser,
                passwordUser: hashedPassword,
                cpfUser,
                dataNasc
            })

            const token = generateToken(newUser)

            res.status(201).json({message: 'Usuário criado com sucesso!', newUser, token: token})
            return
        } catch (error) {
            res.status(500).json({message: "Houve um erro no servidor", error: error.message, details: error})
        }
    }

    static async loginUser(req, res){
        try {
            const {emailUser, passwordUser} = req.body

            const logedUser = await User.findOne({emailUser})

            if(!logedUser){
                res.status(404).json({message: 'Email ou senha incorretos.'})
                return
            }
            
            const isPasswordValid = await bcrypt.compare(passwordUser, logedUser.passwordUser)

            if(!isPasswordValid){
                res.status(401).json({message: 'Email ou senha incorretos.'})
                return
            }

            const token = jwt.sign({id: logedUser.idUser}, process.env.JWT_SECRET, {expiresIn: '1h'})

            res.status(200).json({message: "Usuário logado com sucesso.", user: logedUser, token: token})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno do servidor. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async updateUser(req, res){
        try {
            const {idUser, nameUser, emailUser, passwordUser, cpfUser, dataNasc} = req.body

            if(!idUser){
                res.status(400).json({message: 'Id obrigatório.'})
                return
            }

            const existingUser = await User.findByPk(idUser)
            
            if(!existingUser){
                res.status(400).json({message: 'Usuário inexistente.'})
                return
            }
    
            const updateData = {}
            if (nameUser) updateData.nameUser = nameUser
            if (emailUser) updateData.emailUser = emailUser
            if (cpfUser) updateData.cpfUser = cpfUser
            if (dataNasc) updateData.dataNasc = dataNasc

            if(passwordUser){
                const hashedPassword = await bcrypt.hash(passwordUser, 10)
                updateData.passwordUser = hashedPassword
            }

            await User.update(updateData, {
                where: {idUser}
            })
    
            res.status(202).json({message: 'Usuário alterado com sucesso.', user: updateData})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }


    }

    static async deleteUser(req, res){
        try {
            const {userId} = req.body

            const existingUser = await User.findByPk(userId)
            
            if(!existingUser){
                res.status(400).json({message: 'Usuário inexistente.'})
                return
            }

            await User.destroy({
                where: {idUser: userId}
            })

            res.status(200).json({message: 'Usuário deletado com sucesso.'})
            return
        } catch (error) {
            res.status(500).json({message: 'Houve um erro interno. Tente novamente mais tarde.', details: error.message})
        }
    }

    static async allUsers(req, res){
        try {
            const allUsers = await User.findAll()

            if(allUsers){
                res.status(202).json({message: 'Todos os usuários: ', users: allUsers})
            }else if(allUsers.length === 0){
                res.status(400).json({message: 'Não há usuairos no banco.'})
            }
        } catch (error) {
            res.status(500).json({message: 'Houve um erro'})
        }
    }
}

module.exports = userController