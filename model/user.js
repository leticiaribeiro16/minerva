const db = require('../db');

const User = {
  create: (username, nome, email, matricula, role, token) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, nome, email, matricula, role, token) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [username, nome, email, matricula, role, token], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
  get: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  exists: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT count(*) as count FROM users WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].count > 0);
        }
      });
    });
  },
  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM users WHERE username = ?';
      db.query(query, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] ? results[0].id : null);
        }
      });
    });
  },
  update: (id, nome, email, matricula, role, token) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET nome = ?, email = ?, matricula = ?, role = ?, token = ? WHERE id = ?';
      db.query(query, [nome, email, matricula, role, token, id], (error, results) => {
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