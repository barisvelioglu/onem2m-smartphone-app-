var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const axios = require('axios')

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

var data = {
  "m2m:ae" : {
      "rn": "in-ae",
      "api": "0.2.481.2.0001.001.000161",
      "rr": true,
      "poa": ["http://195.87.214.52:32797"]
    }
};

axios.post('http://localhost:59954/api/v1/onem2m/~/in-cse', data, {
  headers: {
    'Content-Type': 'application/json;ty=2',
  }
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
});

//DISCOVERY

discovery()

function discovery(callback){
  let data = {

  };

  axios.get('http://localhost:59954/api/v1/onem2m/~/in-cse=fu=1&ty=3', {
    headers: {
      'User-Agent' : 'ipe',
      'X-M2M-RI' : "RI" + reqCounter++,
      'X-M2M-Origin' : "in-ae",
      'Content-Type' : 'application/json;'
    }
  })
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  });
}

var reqCounter = 1000;
var containers = [];

setInterval(function(){

  for(var i=0; i<containers.length; i++){
    let cntId = containers[i];
    getLatestContentInstance(cntId);
  }

}, 5000);

function getLatestContentInstance(containerid){

  axios.get('http://localhost:59954/api/v1/onem2m/~' + containerid + "/la", {
    headers: {
      'User-Agent' : 'ipe',
      'X-M2M-RI' : "RI" + reqCounter++,
      'X-M2M-Origin' : "in-ae",
      'Content-Type' : 'application/json;'
    }
  })
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  });
}

module.exports = app;
