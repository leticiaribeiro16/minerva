// index.js
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  res.send('Hello, world!');
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/Aluno', function(req, res) {
  const role = req.session.role;
  res.sendFile(path.join(__dirname, '../view', 'Aluno.html'));
});
module.exports = router;