var express = require('express');
var router = express.Router();
var editalController = require('../controller/editalController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth,requireRole('Professor'));

router.post('/', editalController.createEdital);
router.get('/:id', editalController.getEdital);
router.get('/', editalController.getAllEditais);
router.put('/:id', editalController.updateEdital);
router.delete('/:id', editalController.deleteEdital);

module.exports = router;
