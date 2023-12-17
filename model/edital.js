const db = require('../db');

const Edital = {
  create: (titulo, id_demanda) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO edital (titulo, id_demanda) VALUES (?, ?)';
      db.query(query, [titulo, id_demanda], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT e.id, e.titulo AS tituloedital, u.nome, d.qnt_bolsas, di.nome AS disciplina, di.carga_horaria FROM edital e LEFT JOIN demanda d ON d.id = e.id_demanda LEFT JOIN disciplina di ON di.id = d.id_disciplina left join users u on u.matricula = d.orientador';
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM edital WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  update: (id, titulo, id_demanda) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE edital SET titulo = ?, id_demanda = ? WHERE id = ?';
      db.query(query, [titulo, id_demanda, id], (error, results) => {
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
      const query = 'DELETE FROM edital WHERE id = ?';
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

module.exports = Edital;
