const mysql = require('mysql2');

const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbcheckin'
})

databaseConnection.connect((err) => {
    if(err){
        console.log('Erro ao conectar com o Banco de Dados: ', err)
        return
    }
    console.log('- Conectado ao Banco de Dados MySQL.')
})

module.exports = databaseConnection