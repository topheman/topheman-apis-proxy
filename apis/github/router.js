/*
 * This is the router in charge of the github api
 * Its handler and all of its behavior are described in github.conf.js
 */

'use strict';

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;
var CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE = new RegExp('^'+CURRENT_HANDLER_BASE_PATH);
var GITHUB_API_BASE_PATH = 'https://api.github.com';
var helpers = require('../../utils/helpers');

/* GET users listing. */
router.get('/*', proxy(GITHUB_API_BASE_PATH,{
  forwardPath: function(req, res) {
    res.headers = {};
    res.headers['Content-Type'] = "application/json";
    return req.originalUrl.replace(CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE,"");
  },
  intercept: function(data, req, res, cb) {
    data = data.toString('utf8');
    cb(null, data);
  },
  decorateRequest: function ( req ) {
    req.headers[ 'Accept-Encoding' ] = 'utf8';
    return req;
  }
}));

module.exports = router;
