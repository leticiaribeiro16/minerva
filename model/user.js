const db = require('../db');

const User = {
  create: (nome, email, matricula, role, token) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (nome, email, matricula, role, token) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [nome, email, matricula, role, token], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
  get: (matricula) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE matricula = ?';
      db.query(query, [matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  exists: (matricula) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT count(*) as count FROM users WHERE matricula = ?';
      db.query(query, [matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].count > 0);
        }
      });
    });
  },
  findByMatricula: (matricula) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT matricula FROM users WHERE matricula = ?';
      db.query(query, [matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] ? results[0].matricula : null);
        }
      });
    });
  },
  update: (nome, email, matricula, token) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET nome = ?, email = ?, token = ? WHERE matricula = ?';
      db.query(query, [nome, email, token, matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
  updateUserComissao: (matricula, comissao) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET comissao = ? WHERE matricula = ?';
      db.query(query, [comissao, matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = User;