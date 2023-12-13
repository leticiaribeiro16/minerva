var express = require('express');
var router = express.Router();
var demandaController = require('../controller/demandaController');
var authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authMiddleware);

router.post('/', demandaController.createDemanda);
router.get('/:id', demandaController.getDemanda);
router.put('/:id', demandaController.updateDemanda);
router.delete('/:id', demandaController.deleteDemanda);

module.exports = router;
