var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demandaRouter = require('./routes/demanda');
var editalRouter = require('./routes/edital');
var inscricaoRouter = require('./routes/inscricao');

var app = express();
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
