const mysql = require('mysql');
const fs = require('fs');
const express = require('express')

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "@Senha1234",
    database: "",
    port: 3306,
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
db.query('CREATE DATABASE IF NOT EXISTS minerva', (err, results) => {
    if(err) {
        console.error('Error creating database:', err);
    } else {
        console.log('Database checked/created successfully');
    }
});

db.query('USE minerva', (err, results) => {
    if(err) {
        console.error('Error selecting database:', err);
    } else {
        console.log('Database selected successfully');
    }
});

db.query('SELECT 1 FROM users LIMIT 1', (err, results) => {
    if(err) {
        console.log('Users table does not exist, initializing...');
        db.query(`CREATE TABLE users (
            matricula varchar(255) NOT NULL PRIMARY KEY,
            nome varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            role varchar(255) NOT NULL,
            comissao tinyint(1) DEFAULT 0,
            suaptoken varchar(255),
            apptoken varchar(255)
            );`, (err, results) => {
            if(err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('Users table initialized successfully');
            }
        });
    }
});

module.exports = db;
