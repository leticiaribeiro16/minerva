const Inscricao = require('../model/inscricao');
const authService = require('../service/authService');

exports.createInscricao = async (req, res, next) => {
  try {
    const { turno, id_edital } = req.query;
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = authService.decodeToken(token);
    const matricula = decodedToken.username;

    if (!turno || !id_edital) {
      return res.status(400).json({ message: 'É necessário escolher um edital e escolher o Turno!' });
    }

    const result = await Inscricao.create(Number(id_edital), matricula, Number(turno));
    res.status(201).json({ message: 'Inscricao created successfully!', id: result });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Inscricao already exists!' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.', error: error });
    }
  }
};

exports.getInscricao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = authService.decodeToken(token);
    const matricula = decodedToken.username;
    const inscricao = await Inscricao.get(id, matricula);

    inscricao
      ? res.status(200).json(inscricao)
      : res.status(404).json({ message: 'Inscricao not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.getAllInscricoes = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token && token !== '') {
      const decodedToken = authService.decodeToken(token);
      const matricula = decodedToken.username;
      const inscricoes = await Inscricao.getAll(matricula);
      res.status(200).json(inscricoes);
    } else {
      res.status(403).json({ message: 'Forbidden.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.updateInscricao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const decodedToken = authService.decodeToken(req.session.token);
    const matricula = decodedToken.username;
    const { aprovado, nota, turno } = req.body;

    if (!matricula || typeof aprovado !== 'boolean' || !turno) {
      return res.status(400).json({ message: 'Matricula, boolean aprovado, and turno are required.' });
    }

    const result = await Inscricao.update(id, matricula, aprovado, nota, turno);
    result
      ? res.status(200).json({ message: 'Inscricao updated successfully!' })
      : res.status(404).json({ message: 'Inscricao not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.deleteInscricao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Inscricao.delete(id);

    result
      ? res.status(200).json({ message: 'Inscricao deleted successfully!' })
      : res.status(404).json({ message: 'Inscricao not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};
