const mysql = require('mysql');
const fs = require('fs');
const express = require('express')

const app = express();

const serverCa = [fs.readFileSync("./ssl/DigiCertGlobalRootCA.crt.pem", "utf8")];
const db = mysql.createConnection({
    host: "bdminerva.mysql.database.azure.com",
    user: "minerva",
    password: "AdoAdoAdo123!#$",
    database: "minerva",
    port: 3306,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
});

app.get('/testeConection', (req, res) => {
    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            res.status(500).send('Erro ao conectar MySQL');
        } else {
            console.log('Conexão bem sucedida ao MySQL');
            res.send('Conexão bem sucedida ao MySQL');
        }
    });
});

module.exports = db;
