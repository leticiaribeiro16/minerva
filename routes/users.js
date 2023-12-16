var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', userController.authenticateUser);
router.post('/comissao', userController.updateUserComissao);

module.exports = router;