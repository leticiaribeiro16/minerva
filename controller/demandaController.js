const Demanda = require('../model/demanda');

exports.createDemanda = async (req, res, next) => {
  try {
    const { id_disciplina, qnt_bolsas, requisitos } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = authService.decodeToken(token);
    const orientador = decodedToken.username;

    if (!id_disciplina || !qnt_bolsas || !requisitos) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await Demanda.create(id_disciplina, orientador, qnt_bolsas, requisitos);
    res.status(201).json({ message: 'Demanda created successfully!', id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.getDemanda = async (req, res, next) => {
  try {
    const { id } = req.params;
    const demanda = await Demanda.get(id);

    demanda
      ? res.status(200).json({ message: 'Demanda deleted successfully!' })
      : res.status(404).json({ message: 'Demanda not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.updateDemanda = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_disciplina, qnt_bolsas, requisitos } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = authService.decodeToken(token);
    const orientador = decodedToken.username;

    if (!id_disciplina || !qnt_bolsas || !requisitos) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await Demanda.update(id, id_disciplina, orientador, qnt_bolsas, requisitos);
    result
      ? res.status(200).json({ message: 'Demanda deleted successfully!' })
      : res.status(404).json({ message: 'Demanda not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.deleteDemanda = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Demanda.delete(id);

    result
      ? res.status(200).json({ message: 'Demanda deleted successfully!' })
      : res.status(404).json({ message: 'Demanda not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

