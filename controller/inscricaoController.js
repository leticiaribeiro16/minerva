const Inscricao = require('../model/inscricao');
const authService = require('../service/authService');

exports.createInscricao = async (req, res, next) => {
  try {
    const { matricula, aprovado, nota, turno } = req.body;

    if (!matricula || typeof aprovado !== 'boolean' || !turno) {
      return res.status(400).json({ message: 'Matricula, boolean aprovado, and turno are required.' });
    }

    const result = await Inscricao.create(matricula, aprovado, nota, turno);
    res.status(201).json({ message: 'Inscricao created successfully!', id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
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
