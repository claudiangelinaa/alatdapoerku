// import mysql
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    database: 'alatdapoerku',
    port: 3306
})

module.exports = db