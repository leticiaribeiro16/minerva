var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const demandaRouter = require('./routes/demanda');
const editalRouter = require('./routes/edital');
const inscricaoRouter = require('./routes/inscricao');
const alunoRouter = require('./routes/aluno');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'senhamuitoforte',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: the 'secure' option should be set to true if you're using HTTPS
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demanda', demandaRouter);
app.use('/edital', editalRouter);
app.use('/inscricao', inscricaoRouter);
app.use('/aluno', alunoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
