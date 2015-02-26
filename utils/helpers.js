'use strict';

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
   * @returns {String}
   */
  replaceBaseUrlInJson : function(body, req, apiBaseUrl){
    var newBaseUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    if(typeof body !== "string"){
      body = JSON.stringify(body);
    }
    body = JSON.parse(body,function(key, value){
      if(typeof value === 'string'){
        return value.replace(apiBaseUrl,newBaseUrl);
      }
      else{
        return value;
      }
    });

    return JSON.stringify(body);
  }
};

module.exports = helpers;