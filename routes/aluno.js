// File: routes/aluno.js

const express = require('express');
const router = express.Router();
var authMiddleware = require('../middleware/authMiddleware');
const { requireLogin, requireRole } = require('../middleware/authMiddleware');
router.use(authMiddleware.authMiddleware);

router.use(requireLogin);
router.use(requireRole('Aluno'));

router.get('/processos', function (req, res) {
    res.sendFile(path.join(__dirname, '../view/telasAlunos', 'processos.html'));
});

router.get('/inscricoes', function (req, res) {
    res.sendFile(path.join(__dirname, '../view/telasAlunos', 'inscricoesAluno.html'));
});

module.exports = router;