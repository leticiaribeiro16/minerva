const db = require('../db');

const Demanda = {
  create: (id_disciplina, orientador, qnt_bolsas, requisitos) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO demanda (id_disciplina, orientador, qnt_bolsas, requisitos) VALUES (?, ?, ?, ?)';
      db.query(query, [id_disciplina, orientador, qnt_bolsas, requisitos], (error, results) => {
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
      const query = 'SELECT * FROM demanda WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  update: (id, id_disciplina, orientador, qnt_bolsas, requisitos) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE demanda SET id_disciplina = ?, orientador = ?, qnt_bolsas = ?, requisitos = ? WHERE id = ?';
      db.query(query, [id_disciplina, orientador, qnt_bolsas, requisitos, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM demanda WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = Demanda;
