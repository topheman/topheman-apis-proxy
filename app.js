'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressCors = require('express-cors');
var cors = require('cors');
var config = require('./config/environment');

var app = express();

var apis = require('./apis')(app.get('env'));

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
// not to pollute unit testing report with http logs
if(!process.env.MOCHA_IS_ACTIVE){
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// set the view engine to ejs
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

function getCorsOptions(apiOptions){
  var result = false;
  if(typeof apiOptions.cors === 'undefined' || apiOptions.cors === false){
    result = false;
  }
  else if(apiOptions.cors === true){
    result = true;
  }
  else if(apiOptions.cors instanceof Array){
    if(apiOptions.cors.length === 0){
      result = false;
    }
    else if(apiOptions.cors.indexOf('*') > -1){
      result = true;
    }
    else{
      result = apiOptions.cors;
    }
  }
  else if(typeof apiOptions.cors === 'string'){
    result = [apiOptions.cors];
  }
  return result;
}

for(var api in apis){
  if(typeof config[api] === 'object' && config[api].active === true){
    //CORS setup
    var corsOptionsFromConfig = getCorsOptions(config[api]);
    if(corsOptionsFromConfig === true){
      app.use(apis[api].endpoint,cors());
    }
    else if(corsOptionsFromConfig instanceof Array && corsOptionsFromConfig.length > 0){
      app.use(apis[api].endpoint,expressCors({
        allowedOrigins : corsOptionsFromConfig
      }));
    }
    //api endpoint setup - default entry point of handler is a module called "router" in each api folder
    app.use(apis[api].endpoint, require(path.resolve(apis[api].path,'./router')) );
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.json({
      error:{
        message: err.message,
        status: err.status,
        stack: err.stack
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error:{
      message : err.message
    }
  });
});


module.exports = app;
