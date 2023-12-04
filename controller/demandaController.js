const Demanda = require('../model/demanda');

exports.createDemanda = async (req, res) => {
  try {
    const { id_disciplina, orientador, qnt_bolsas, requisitos } = req.body;

    if (!id_disciplina || !orientador || !qnt_bolsas || !requisitos) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await Demanda.create(id_disciplina, orientador, qnt_bolsas, requisitos);
    res.status(201).json({ message: 'Demanda created successfully!', id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};

exports.getDemanda = async (req, res) => {
  try {
    const { id } = req.params;
    const demanda = await Demanda.get(id);

    if (demanda) {
      res.status(200).json(demanda);
    } else {
      res.status(404).json({ message: 'Demanda not found!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.', error: error });
  }
};
