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
    if (err) {
        console.error('Error creating database:', err);
    } else {
        console.log('Database checked/created successfully');
    }
});

db.query('USE minerva', (err, results) => {
    if (err) {
        console.error('Error selecting database:', err);
    } else {
        console.log('Database selected successfully');
    }
});

db.query('SELECT 1 FROM users LIMIT 1', (err, results) => {
    if (err) {
        console.log('Users table does not exist, initializing...');
        db.query(`CREATE TABLE users (
            matricula varchar(255) NOT NULL PRIMARY KEY,
            nome varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            role varchar(255) NOT NULL,
            comissao tinyint(1) DEFAULT 0,
            suaptoken varchar(255),
            apptoken varchar(255),
            urlfoto varchar(255),
            curso varchar(255)
            );`, (err, results) => {
            if (err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('Users table initialized successfully');
            }
        });
        db.query(`INSERT INTO users (matricula, nome, email, comissao) VALUES ('123456', 'Professor Mock', 'professor.mock@example.com', 1)`, (err, results) => {
            if (err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('Mock Aluno user inserted successfully');
            }
        });
        // db.query(`INSERT INTO users (matricula, nome, email, role, comissao, suaptoken, apptoken) VALUES ('20201041110005', 'Leticia Ribeiro', 'ribeiro.l@academico.ifrn.edu.br', 'Aluno', '0', 'token', '')`, (err, results) => {
        //     if (err) {
        //         console.error('Error initializing users table:', err);
        //     } else {
        //         console.log('Mock Professor user inserted successfully');
        //     }
        // });
    }
});
db.query('SELECT 1 FROM disciplina LIMIT 1', (err, results) => {
    if (err) {
        console.log('Disciplina table does not exist, initializing...');
        db.query(`CREATE TABLE disciplina (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao VARCHAR(255),
            carga_horaria INT
        );`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina table initialized successfully');
            }
        });

        db.query(`INSERT INTO disciplina (nome, descricao, carga_horaria) VALUES ('Matemática', 'Estudo de números e formas', 100)`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina Matemática inserted successfully');
            }
        });

        db.query(`INSERT INTO disciplina (nome, descricao, carga_horaria) VALUES ('Física', 'Estudo de matéria e energia', 120)`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina Física inserted successfully');
            }
        });

        db.query(`INSERT INTO disciplina (nome, descricao, carga_horaria) VALUES ('Química', 'Estudo de substâncias e suas interações', 110)`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina Química inserted successfully');
            }
        });

        db.query(`INSERT INTO disciplina (nome, descricao, carga_horaria) VALUES ('Biologia', 'Estudo de organismos vivos', 130)`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina Biologia inserted successfully');
            }
        });

        db.query(`INSERT INTO disciplina (nome, descricao, carga_horaria) VALUES ('Ciência da Computação', 'Estudo de computação e informação', 140)`, (err, results) => {
            if (err) {
                console.error('Error initializing disciplina table:', err);
            } else {
                console.log('Disciplina Ciência da Computação inserted successfully');
            }
        });
    } else {
        console.log('Disciplina table initialized successfully');
    }
});

db.query('SELECT 1 FROM demanda LIMIT 1', (err, results) => {
    if (err) {
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
            if (err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('demanda table initialized successfully');
            }
        });
    }
});
db.query('SELECT 1 FROM edital LIMIT 1', (err, results) => {
    if (err) {
        console.log('edital table does not exist, initializing...');
        db.query(`CREATE TABLE edital (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255),
            id_demanda INT,
            FOREIGN KEY (id_demanda) REFERENCES demanda(id)
        );`, (err, results) => {
            if (err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('edital table initialized successfully');
            }
        });
        db.query(`INSERT INTO demanda (id_disciplina, orientador, qnt_bolsas, requisitos) VALUES (1, '123456', 1, 'Some requisitos')`, (err, results) => {
            if(err) {
                console.error('Error initializing demanda table:', err);
            } else {
                console.log('Demanda inserted successfully');
            }
        });
        db.query(`INSERT INTO demanda (id_disciplina, orientador, qnt_bolsas, requisitos) VALUES (2, '123456', 3, 'Alguns')`, (err, results) => {
            if(err) {
                console.error('Error initializing demanda table:', err);
            } else {
                console.log('Demanda inserted successfully');
            }
        });
    }
});
db.query('SELECT 1 FROM inscricao LIMIT 1', (err, results) => {
    if (err) {
        console.log('inscricao table does not exist, initializing...');
        db.query(`CREATE TABLE inscricao (
            id_edital INT,
            matricula VARCHAR(255),
            aprovado SMALLINT default 0,
            turno SMALLINT not null,
            nota FLOAT,
            PRIMARY KEY (id_edital, matricula),
            FOREIGN KEY (id_edital) REFERENCES edital(id),
            FOREIGN KEY (matricula) REFERENCES users(matricula)
        );`, (err, results) => {
            if (err) {
                console.error('Error initializing users table:', err);
            } else {
                console.log('inscricao table initialized successfully');
            }
        });
        db.query(`INSERT INTO edital (titulo, id_demanda) VALUES ('Edital 1', 1)`, (err, results) => {
            if(err) {
                console.error('Error initializing edital table:', err);
            } else {
                console.log('Edital inserted successfully');
            }
        });
        db.query(`INSERT INTO edital (titulo, id_demanda) VALUES ('Monitoria de Fisica', 2)`, (err, results) => {
            if(err) {
                console.error('Error initializing edital table:', err);
            } else {
                console.log('Edital inserted successfully');
            }
        });
        // db.query(`INSERT INTO inscricao (id_edital, matricula, turno) VALUES (1,'20201041110005', 1)`, (err, results) => {
        //     if (err) {
        //         console.error('Error inserting into inscricao table:', err);
        //     } else {
        //         console.log('Inscricao inserted successfully');
        //     }
        // });
    }
});
module.exports = db;
