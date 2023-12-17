var express = require('express');
var router = express.Router();
var editalController = require('../controller/editalController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth);

router.get('/', editalController.getAllEditais);
router.use(requireRole('Professor'));

router.post('/', editalController.createEdital);
router.get('/:id', editalController.getEdital);
router.put('/:id', editalController.updateEdital);
router.delete('/:id', editalController.deleteEdital);

module.exports = router;
