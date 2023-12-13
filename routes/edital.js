var express = require('express');
var router = express.Router();
var editalController = require('../controller/editalController');
var authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authMiddleware);

router.post('/', editalController.createEdital);
router.get('/:id', editalController.getEdital);
router.get('/', editalController.getAllEditais);
router.put('/:id', editalController.updateEdital);
router.delete('/:id', editalController.deleteEdital);

module.exports = router;
