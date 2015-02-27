/*
 * This is the router in charge of the github api
 */

'use strict';

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;
var CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE = new RegExp('^'+CURRENT_HANDLER_BASE_PATH);//regexp that capture the current route (in order to remove it)
var PROXY_HANDLER_BASE_PATH = process.env.NODE_ENV === 'test' ? "/githubApiMock" : "";//replace with that

// in test mode, a mock of github api is launched on the handler /githubApiMock
var GITHUB_BASE_URL_PATH_TO_REPLACE = 'https://api.github.com';//whatever mode, this is the api path to replace
var GITHUB_API_BASE_PATH = process.env.NODE_ENV === 'test' ? ('http://localhost:'+(process.env.PORT || 9000)) : GITHUB_BASE_URL_PATH_TO_REPLACE;//this is the server to proxy

var helpers = require('../../utils/helpers');
var utils = require('../../utils/utils');

var credentialsParams = {};
if(!process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_SECRET){
  console.warn("Specify GITHUB_CLIENT_SECRET & GITHUB_CLIENT_ID env variables (you're using github API unauthenticated, which gives you lower rate limits)");
}
else{
  credentialsParams.client_id = process.env.GITHUB_CLIENT_ID;
  credentialsParams.client_secret = process.env.GITHUB_CLIENT_SECRET;
}

/* GET users listing. */
router.get('/*', proxy(GITHUB_API_BASE_PATH,{
  forwardPath: function(req, res) {
    var newUrl;
    res.headers = {};
    res.headers['Content-Type'] = "application/json";
    newUrl = req.originalUrl.replace(CURRENT_HANDLER_BASE_PATH_REGEX_REPLACE,PROXY_HANDLER_BASE_PATH);
    newUrl = utils.generateUrl(newUrl,credentialsParams);
    return newUrl;
  },
  intercept: function(data, req, res, cb) {
    // 304 not modified > returns empty response > don't process the response
    if(res.statusCode !== 304){
      data = data.toString('utf8');
      data = helpers.transformResponseBody.replaceBaseUrlInJson(data, req, GITHUB_BASE_URL_PATH_TO_REPLACE);
    }
    cb(null, data);
  },
  decorateRequest: function ( req ) {
    req.headers[ 'Accept-Encoding' ] = 'utf8';
    return req;
  }
}));

module.exports = router;
