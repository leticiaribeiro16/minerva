const Edital = require('../model/edital');
const Inscricao = require('../model/inscricao');
const authService = require('../service/authService');

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

router.get('/inscricoes/novainscricao', async function (req, res) {
    const id = req.query.id;
    const edital = await Edital.getById(id);
    res.render('telasAlunos/confirmaInscricao', { id: id, edital: edital });
});
router.get('/inscricoes/:id', async function (req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send({ error: 'ID must be an integer' });
    }
    const token = req.session.token;
    const decodedToken = authService.decodeToken(token);
    const matricula = decodedToken.username;
    const inscricao = await Inscricao.getById(id,matricula);
    res.render('telasAlunos/alunoDetalha', { id: id, edital: inscricao });
});

module.exports = router;