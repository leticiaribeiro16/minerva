// index.js
var express = require('express');
var router = express.Router();
var path = require('path');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.get('/', function(req, res, next) {
  res.send('Hello, world!');
});

router.get('/login', function(req, res) {
  req.session.token = req.body.token;
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/Aluno', requireLogin, function(req, res) {
  res.sendFile(path.join(__dirname, '../view', 'Aluno.html'));
});
module.exports = router;