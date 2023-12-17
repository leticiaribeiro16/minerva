var express = require('express');
var router = express.Router();
var editalController = require('../controller/editalController');
const { requireLogin, requireRole } = require('../middleware/authMiddleware');

router.get('/', editalController.getAllEditais);
router.use(requireLogin, requireRole('Professor'));

router.post('/', editalController.createEdital);
router.get('/:id', editalController.getEdital);
router.put('/:id', editalController.updateEdital);
router.delete('/:id', editalController.deleteEdital);

module.exports = router;
