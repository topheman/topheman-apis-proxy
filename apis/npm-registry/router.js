/*
 * This is the router in charge of the npm-registry api
 */

'use strict';

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var helpers = require('../../utils/helpers');
var utils = require('../../utils/utils');

var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;
var forwardPathUrlReplacer = helpers.forwardPathUrlReplacer.Factory(CURRENT_HANDLER_BASE_PATH, "/npmRegistryMock-TODO");// in test mode, a mock of github api is launched on the handler /githubApiMock

var BASE_URL_PATH_TO_REPLACE = 'https://registry.npmjs.org';//whatever mode, this is the api path to replace
var API_BASE_PATH = helpers.getApiBasePath(BASE_URL_PATH_TO_REPLACE);//this is the server to proxy

//ensure trailing slashe
router.use(function (req, res, next) {
  if (req.originalUrl.substr(-1) !== '/' && req.originalUrl.length < (CURRENT_HANDLER_BASE_PATH.length + 1)) {
    res.redirect(301, req.originalUrl + "/");
  }
  else {
    next();
  }
});

console.log(API_BASE_PATH)

/* GET users listing. */
router.get('/*', proxy(API_BASE_PATH, {
  forwardPath: function (req, res) {
    res.headers = {};
    res.headers['Content-Type'] = "application/json";
    console.log(req);
    return utils.generateUrl(forwardPathUrlReplacer(req));
  },
  intercept: function (data, req, res, cb) {
    helpers.propagateCorsHeaders(req,res);
    cb(null, data);
  },
}));

module.exports = router;
