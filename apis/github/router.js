/*
 * This is the router in charge of the github api
 */

'use strict';

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var helpers = require('../../utils/helpers');
var utils = require('../../utils/utils');

var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;
var forwardPathUrlReplacer = helpers.forwardPathUrlReplacer.Factory(CURRENT_HANDLER_BASE_PATH, "/githubApiMock");// in test mode, a mock of github api is launched on the handler /githubApiMock

var BASE_URL_PATH_TO_REPLACE = 'https://api.github.com';//whatever mode, this is the api path to replace
var API_BASE_PATH = helpers.getApiBasePath(BASE_URL_PATH_TO_REPLACE);//this is the server to proxy


var credentialsParams = {};
if (!process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_SECRET && !process.env.NODE_ENV === 'test') {
  console.warn("Specify GITHUB_CLIENT_SECRET & GITHUB_CLIENT_ID env variables (you're using github API unauthenticated, which gives you lower rate limits)");
}
else {
  credentialsParams.client_id = process.env.GITHUB_CLIENT_ID;
  credentialsParams.client_secret = process.env.GITHUB_CLIENT_SECRET;
}

//ensure trailing slashe
router.use(function (req, res, next) {
  if (req.originalUrl.substr(-1) !== '/' && req.originalUrl.length < (CURRENT_HANDLER_BASE_PATH.length + 1)) {
    res.redirect(301, req.originalUrl + "/");
  }
  else {
    next();
  }
});

/* GET users listing. */
router.get('/*', proxy(API_BASE_PATH, {
  forwardPath: function (req, res) {
    res.headers = {};
    res.headers['Content-Type'] = "application/json";
    return utils.generateUrl(forwardPathUrlReplacer(req), credentialsParams);
  },
  intercept: function (data, req, res, cb) {
    helpers.propagateCorsHeaders(req,res);
    //if link headers, replace them
    if(res.get('link')){
      var newBaseUrl = helpers.getNewBaseUrl(req);
      var link = res.get('link');
      link = link.replace(new RegExp(BASE_URL_PATH_TO_REPLACE,"g"), newBaseUrl);
      link = link.replace(/\&client_id\=[a-z0-9]+&client_secret=[a-z0-9]+/g,"");
      res.set('link',link);
    }
    //manage server error > get them to the end user (prod / dev mode)
    if (res.statusCode >= 400) {
      var error = new Error("Server Error (github), http " + res.statusCode);
      error.status = res.statusCode;
      return cb(error);
    }
    // 304 not modified > returns empty response > don't process the response
    // anything not an error or a 304 but not json, shouldn't be manage by replaceBaseUrlInJson
    else if (res.statusCode !== 304 && res.get('Content-Type').indexOf('application/json') > -1) {
      data = data.toString('utf8');
      data = helpers.transformResponseBody.replaceBaseUrlInJson(data, req, BASE_URL_PATH_TO_REPLACE);
    }
    cb(null, data);
  },
  decorateRequest: function (req) {
    req.headers[ 'Accept-Encoding' ] = 'utf8';
    return req;
  }
}));

module.exports = router;
