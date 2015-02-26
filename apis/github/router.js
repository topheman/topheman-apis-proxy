/*
 * This is the router in charge of the github api
 * Its handler and all of its behavior are described in github.conf.js
 */

'use strict';

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;
var CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE = new RegExp('^'+CURRENT_HANDLER_BASE_PATH);//regexp that capture the current route (in order to remove it)
var PROXY_HANDLER_BASE_PATH = process.env.NODE_ENV === 'test' ? "/githubApiMock" : ""//replace with that

// in test mode, a mock of github api is launched on the handler /githubApiMock
var GITHUB_API_BASE_PATH = process.env.NODE_ENV === 'test' ? ('http://localhost:'+(process.env.PORT || 9000)) : 'https://api.github.com';
var helpers = require('../../utils/helpers');

/* GET users listing. */
router.get('/*', proxy(GITHUB_API_BASE_PATH,{
  forwardPath: function(req, res) {
    res.headers = {};
    res.headers['Content-Type'] = "application/json";
    return req.originalUrl.replace(CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE,PROXY_HANDLER_BASE_PATH);
  },
  intercept: function(data, req, res, cb) {
    data = data.toString('utf8');
    data = helpers.transformResponseBody.replaceBaseUrlInJson(data, req, GITHUB_API_BASE_PATH);
    cb(null, data);
  },
  decorateRequest: function ( req ) {
    req.headers[ 'Accept-Encoding' ] = 'utf8';
    return req;
  }
}));

module.exports = router;
