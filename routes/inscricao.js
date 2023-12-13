var express = require('express');
var router = express.Router();
var inscricaoController = require('../controller/inscricaoController');
var authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authMiddleware);

router.post('/', inscricaoController.createInscricao);
router.get('/:id', inscricaoController.getInscricao);
router.get('/', inscricaoController.getAllInscricoes); 
router.put('/:id', inscricaoController.updateInscricao);
router.delete('/:id', inscricaoController.deleteInscricao);

module.exports = router;
