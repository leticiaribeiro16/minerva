var express = require('express');
var router = express.Router();
var inscricaoController = require('../controller/inscricaoController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth,requireRole('Aluno'));

router.post('/', inscricaoController.createInscricao);
router.get('/:id', inscricaoController.getInscricao);
router.get('/', inscricaoController.getAllInscricoes); 
router.put('/:id', inscricaoController.updateInscricao);
router.delete('/:id', inscricaoController.deleteInscricao);

module.exports = router;
