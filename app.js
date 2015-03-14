'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('errors');

var corsPlugin = require('./plugins/cors');
var disableJsonpPlugin = require('./plugins/disableJsonp');

var app = express();
var expressLayouts = require('express-ejs-layouts');

var apisConfiguration = require('./config/environment');
var apisDescription = require('./apis')(app.get('env'));

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
// not to pollute unit testing report with http logs
if(!process.env.MOCHA_IS_ACTIVE){
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

// set the layout part
app.set('layout', 'layout');
app.use(expressLayouts);

for(var api in apisDescription){
  if(typeof apisConfiguration[api] === 'object' && apisConfiguration[api].active === true){
    corsPlugin(apisDescription[api], apisConfiguration[api], app);
    disableJsonpPlugin(apisDescription[api], apisConfiguration[api], app);
    //api endpoint setup - default entry point of handler is a module called "router" in each api folder
    app.use(apisDescription[api].endpoint, require(path.resolve(apisDescription[api].path,'./router')) );
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
    debug(err.message, err.status);
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
  debug(err.message, err.status);
  res.status(err.status || 500);
  res.json({
    error:{
      message : err.message
    }
  });
});


module.exports = app;
