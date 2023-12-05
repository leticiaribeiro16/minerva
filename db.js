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
db.query('SELECT 1 FROM disciplina LIMIT 1', (err, results) => {
    if(err) {
        console.log('Disciplina table does not exist, initializing...');
        db.query(`CREATE TABLE disciplina (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao VARCHAR(255),
            carga_horaria INT
        );`, (err, results) => {
            if(err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('Disciplina table initialized successfully');
            }
        });
    }
});

db.query('SELECT 1 FROM demanda LIMIT 1', (err, results) => {
    if(err) {
        console.log('demanda table does not exist, initializing...');
        db.query(`CREATE TABLE demanda (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_disciplina INT,
            orientador VARCHAR(255),
            qnt_bolsas INT,
            requisitos VARCHAR(255),
            FOREIGN KEY (id_disciplina) REFERENCES disciplina(id),
            FOREIGN KEY (orientador) REFERENCES users(matricula)
        );`, (err, results) => {
            if(err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('demanda table initialized successfully');
            }
        });
    }
});
db.query('SELECT 1 FROM inscricao LIMIT 1', (err, results) => {
    if(err) {
        console.log('inscricao table does not exist, initializing...');
        db.query(`CREATE TABLE inscricao (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_user VARCHAR(255),
            aprovado BOOLEAN,
            nota FLOAT,
            FOREIGN KEY (id_user) REFERENCES users(matricula)
        );`, (err, results) => {
            if(err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('inscricao table initialized successfully');
            }
        });
    }
});
db.query('SELECT 1 FROM edital LIMIT 1', (err, results) => {
    if(err) {
        console.log('edital table does not exist, initializing...');
        db.query(`CREATE TABLE edital (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255),
            id_demanda INT,
            FOREIGN KEY (id_demanda) REFERENCES demanda(id)
        );`, (err, results) => {
            if(err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('edital table initialized successfully');
            }
        });
    }
});
module.exports = db;
