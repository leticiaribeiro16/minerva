const Edital = require('../model/edital');

const path = require('path');
const express = require('express');
const router = express.Router();
const { requireLogin, requireRole } = require('../middleware/authMiddleware');

router.use(requireLogin);
router.use(requireRole('Aluno'));

router.get('/processos', function (req, res) {
    res.sendFile(path.join(__dirname, '../view/telasAlunos', 'processos.html'));
});

router.get('/inscricoes', function (req, res) {
    res.sendFile(path.join(__dirname, '../view/telasAlunos', 'inscricoesAluno.html'));
});

router.get('/inscricoes/:id', async function (req, res) {
    const id = req.params.id;
    const edital = await Edital.getById(id);
    console.log(edital);
    res.render('telasAlunos/confirmaInscricao', { id: id, edital: edital });
});

module.exports = router;