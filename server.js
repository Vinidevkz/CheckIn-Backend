const express = require('express')
const app = express()


require("dotenv").config();

const db = require('./src/models')

//import routes
const userRoutes = require('./src/routes/userRoutes')
const movieRoutes = require('./src/routes/movieRoutes')
const sessionRoutes = require('./src/routes/sessionRoutes')
const seatRoutes = require('./src/routes/seatRoutes')

//configs
app.use(express.json())
const port = 3000

db.sequelize.authenticate()
  .then(() => {
    console.log('✓ Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });


db.sequelize.sync()
  .then(() => {
    console.log('✓ Modelos sincronizados com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar modelos:', err);
  })

//routes
app.use('/api', userRoutes)
app.use('/api', movieRoutes)
app.use('/api', sessionRoutes)
app.use('/api', seatRoutes)



//listens
app.listen(port, () => {

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    console.log('- Servidor rodando na porta', port)
})
