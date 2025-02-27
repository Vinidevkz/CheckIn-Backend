const express = require('express')
const app = express()

//database connection
const db = require('./src/database/dbConfig')

app.get('/', (req, res) => {
    db.query('SELECT * FROM tbusers', (err, result) => {
        if(err){
            res.status(500).send("Não foi possível pegar todos os usuários.")
        }else{
            res.status(200).send({message: 'Todos os usuários:', result})
        }
    })
})




app.use(express.json())
const port = 3000

app.listen(port, () => {
    console.log(' - Servidor rodando na porta', port)
})
