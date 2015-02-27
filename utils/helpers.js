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

/**
 * In dev/prod mode, this method will return you apiBasePath,
 * In test mode, it will return you http://localhost:9000 (at least the port used on process.env.PORT)
 * This is only for better reading and force unit testing
 * @param {string} apiBasePath
 * @returns {string}
 */
helpers.getApiBasePath = function(apiBasePath){
  if(process.env.NODE_ENV === 'test'){
    return 'http://localhost:'+(process.env.PORT || 9000);
  }
  else{
    return apiBasePath;
  }
};

helpers.forwardPathUrlReplacer = {};

/**
 * This Factory will create the function to use inside the forwardPath attribute of express-http-proxy
 * It will manage the switching between your original url and the one you send via the proxy
 * @param {string} endpoint
 * @param {string} testEndpoint
 * @returns {Function} function(req){}
 */
helpers.forwardPathUrlReplacer.Factory = function(endpoint,testEndpoint){
  //regexp that captures your endpoint from the originalUrl (in order to remove it)
  var endpointRegExpReplace = new RegExp('^'+endpoint);
  //will replace it with :
  // * normal mode : nothing > to let you add the whole originalUrl to your API_BASE_PATH
  // * test mode : the testEndPoint (a router you would have add to the test api routers that serves mock data)
  var proxyHandlerBasePath;
  if(typeof testEndpoint === 'string' && process.env.NODE_ENV === 'test'){
    proxyHandlerBasePath = testEndpoint;
  }
  else{
    proxyHandlerBasePath = "";
  }
  return function(req){
    return req.originalUrl.replace(endpointRegExpReplace,proxyHandlerBasePath);
  };
};

module.exports = helpers;