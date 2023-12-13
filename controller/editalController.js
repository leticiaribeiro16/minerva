const Edital = require('../model/edital');

exports.createEdital = async (req, res, next) => {
  try {
    const { titulo, id_demanda } = req.body;

    if (!titulo || !id_demanda) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await Edital.create(titulo, id_demanda);
    res.status(201).json({ message: 'Edital created successfully!', id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.getEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const edital = await Edital.getById(id);

    edital
      ? res.status(200).json(edital)
      : res.status(404).json({ message: 'Edital not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.updateEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, id_demanda } = req.body;

    if (!titulo || !id_demanda) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await Edital.update(id, titulo, id_demanda);
    result
      ? res.status(200).json({ message: 'Edital updated successfully!' })
      : res.status(404).json({ message: 'Edital not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.deleteEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Edital.delete(id);

    result
      ? res.status(200).json({ message: 'Edital deleted successfully!' })
      : res.status(404).json({ message: 'Edital not found!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};
