var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function createUI(callback){
  var data = {
      "m2m:ae" : {
          "rn": "in-ae",
          "api": "0.2.481.2.0001.001.000161",
          "rr": true,
          "poa": ["http://192.168.1.152:32797"]
        }
  };

  var parsedData = JSON.parse(data);

  request.post({
      url : mnCseUrl,
      headers : {
          'User-Agent' : 'in-ae',
          'X-M2M-RI' : "RI61",
          'X-M2M-Origin' : "CUi",
          'Content-Type' : 'application/json;ty=2'
      },
      formData : parsedData
  }, function(err, response, body){
      if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Successful!!', body);
  });
}


module.exports = app;
