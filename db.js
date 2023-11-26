const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'http://bdminerva.mysql.database.azure.com',
  user: 'bdminerva',
  password: 'AdoAdoAdo123!#$',
  database: 'minerva'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

module.exports = connection;