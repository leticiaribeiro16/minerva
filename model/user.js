const db = require('../db');

const User = {
  create: (nome, email, matricula, role, soaptoken, apptoken, urlfoto, curso) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (nome, email, matricula, role, suaptoken, apptoken, urlfoto, curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [nome, email, matricula, role, soaptoken, apptoken, urlfoto, curso], (error, results) => {
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
      const query = 'SELECT * FROM users WHERE matricula = ?';
      db.query(query, [matricula], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] ? results[0] : null);
        }
      });
    });
  },
  update: (matricula, suaptoken, apptoken) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET suaptoken = ?, apptoken = ? WHERE matricula = ?';
      db.query(query, [suaptoken, apptoken, matricula], (error, results) => {
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