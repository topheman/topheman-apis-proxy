'use strict';

var utils = require('./utils');

var helpers = {};

helpers.transformResponseBody = {
  /**
   * This function modifies the body of the request, it must return a string
   * which will be sent as the body of the response
   * It changes the url relative to the api server to your server
   * 
   * @param {String} body
   * @param {Express.Request} req
   * @param {String} apiBaseUrl
   * @param {Object} params
   * @returns {String}
   */
  replaceBaseUrlInJson : function(body, req, apiBaseUrl, params){
    var newBaseUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    if(typeof body !== "string"){
      body = JSON.stringify(body);
    }
    body = JSON.parse(body,function(key, value){
      if(typeof value === 'string'){
        if(typeof params !== 'undefined' && Object.keys(params).length && value.indexOf(apiBaseUrl) > -1){
          return utils.generateUrl(value.replace(apiBaseUrl,newBaseUrl),params);
        }
        else{
          return value.replace(apiBaseUrl,newBaseUrl);
        }
      }
      else{
        return value;
      }
    });

    return JSON.stringify(body);
  }
};

module.exports = helpers;