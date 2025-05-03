// backend/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE   
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

module.exports = connection;