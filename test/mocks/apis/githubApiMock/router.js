/*
 * This is a simple mock router file that export the genericMockRouter module
 * Every mock router use the same router
 */

'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');

// This header will be set on all responses, check for it on tests
// for unit tests on response header passing through proxy
router.all('*', function(req, res, next){
  res.set('X-Github-Api-Mock','test');
  next();
});

router.get('/', function (req, res) {
  var json = require('./responses/root.json');
  res.json(json);
});

router.get('/users/topheman', function (req, res) {
  var json = require('./responses/users-topheman.json');
  res.json(json);
});

router.get('/errors/:statusCode', function (req, res) {
  res.status(req.params.statusCode)
          .set('Content-Type', 'text/html')
          .send('<p>Error http '+req.params.statusCode+'</p>');
});

module.exports = router;
