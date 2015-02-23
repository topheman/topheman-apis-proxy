'use strict';

var urlHelper = require('url');
var _ = require('lodash');

var utils = {};

/**
 * This method is based on the format method of the url module : https://www.npmjs.com/package/url#urlformaturlobj
 * It accepts all the arguments of the url.format() method (not all of them are list below)
 * It also accept queryParamsToAdd
 * 
 * Note : This method may not be very optimized (since it parses and then formats the url)
 * and also, it will behave weirdly with bad urls (such as example patterns in APIs)
 * 
 * @param {String} url
 * @param @optional {Object} [options]
 * @param @optional {String} [options.host]
 * @param @optional {String} [options.port]
 * @param @optional {String} [options.query]
 * @param @optional {Object|String} [options.queryParamsToAdd] Will be added to the query string
 * @returns {String}
 */
utils.formatUrl = function (url, options) {
  if (typeof options === 'object') {
    var parsedUrl = urlHelper.parse(url);
    _.merge(parsedUrl, options);
    if (typeof parsedUrl.queryParamsToAdd !== 'undefined') {
      var queryParamsToAdd, queryToAdd;
      if (typeof parsedUrl.queryParamsToAdd === 'object' && Object.keys(parsedUrl.queryParamsToAdd).length > 0) {
        for (var key in parsedUrl.queryParamsToAdd) {
          queryParamsToAdd.push(key + '=' + parsedUrl.queryParamsToAdd);
        }
      }
      else if (typeof parsedUrl.queryParamsToAdd === 'string' && parsedUrl.queryParamsToAdd.length > 0) {
        queryParamsToAdd = [parsedUrl.queryParamsToAdd];
      }
      queryToAdd = queryParamsToAdd.join('&');
      // "?" is present but not at the end of the query string (neither "&" at the end)
      if (parsedUrl.search && parsedUrl.search.indexOf('?') > -1 && /\?$/.test(parsedUrl.search) === false && /\&$/.test(parsedUrl.search) === false) {
        parsedUrl.search += "&";
      }
      // "?" not present
      else if (!parsedUrl.search || parsedUrl.search.indexOf('?') === -1) {
        parsedUrl.search = "?";
      }
      // "?" is present but at the end -> nothing to do
      parsedUrl.search += queryToAdd;
    }
    if (typeof options.port === 'undefined' && typeof options.hostname !== 'undefined') {
      parsedUrl.host = options.hostname;
    }
    if (typeof options.port !== 'undefined' && options.port != 80 && options.port != 443) {
      parsedUrl.host = undefined;
      parsedUrl.hostname = options.host || options.hostname;
    }
//    console.log(parsedUrl);
    return urlHelper.format(parsedUrl);
  }
  else {
    return url;
  }
};

/**
 * Generates a url, adding your params at the end, taking care of "&" and "?"
 * @param {String} url
 * @param {Object} params
 * @returns {String}
 */
utils.generateUrl = function (url, params) {
  // "?" is present but not at the end of the query string (neither "&" at the end)
  if (url.indexOf('?') > -1 && /\?$/.test(url) === false && /\&$/.test(url) === false) {
    url += "&";
  }
  // "?" not present
  else if (url.indexOf('?') === -1) {
    url += "?";
  }
  // "?" is present but at the end -> nothing to do

  var queryParams = [];
  if (typeof params !== 'undefined' && Object.keys(params).length > 0) {
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        queryParams.push(param + "=" + params[param]);
      }
    }
  }

  if (queryParams.length > 0) {
    url += queryParams.join('&');
  }
  else if (/\?$/.test(url)) {
    url = url.replace(/\?$/, "");//remove trailing "?" if no params
  }

  return url;
};

/**
 * Helpers which removes some params that you don't want to send to the api server
 * (such as tokens, sessionIds ...)
 * @param {String|Array} params
 * @returns {undefined}
 */
utils.cleanRequestParams = function (params) {

};

module.exports = utils;