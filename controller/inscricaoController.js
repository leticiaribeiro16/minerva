const Inscricao = require('../model/inscricao');

exports.createInscricao = async (req, res, next) => {
  try {
    const { matricula, aprovado, nota } = req.body;

    if (!matricula || typeof aprovado !== 'boolean') {
      return res.status(400).json({ message: 'Matricula and boolean aprovado are required.' });
    }

    const result = await Inscricao.create(matricula, aprovado, nota);
    res.status(201).json({ message: 'Inscricao created successfully!', id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.getInscricao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inscricao = await Inscricao.get(id);

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
    const inscricoes = await Inscricao.getAll();
    res.status(200).json(inscricoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.updateInscricao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { matricula, aprovado, nota } = req.body;

    if (!matricula || typeof aprovado !== 'boolean') {
      return res.status(400).json({ message: 'Matricula and boolean aprovado are required.' });
    }

    const result = await Inscricao.update(id, matricula, aprovado, nota);
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
