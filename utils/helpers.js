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
 * When I launch npm test, I start one server on which one the tests are passed
 * and an other one on port 8001 which serves the mock APIs to be proxied (see before hooks)
 * so this helpers returns different urls :
 * 
 * In dev/prod mode, this method will return you apiBasePath (same param you passed),
 * In test mode, it will return you http://localhost:8000 (base path of the test server launched bu grunt serve:test)
 * In test mode, when npm test is run , it will return http://localhost:8001 (base path of the test server launched when npm test)
 * This is only for better reading and force unit testing
 * @param {string} apiBasePath
 * @returns {string}
 */
helpers.getApiBasePath = function(apiBasePath){
  if(process.env.NODE_ENV === 'test' && process.env.MOCHA_IS_ACTIVE == "true"){
    return 'http://localhost:8001';
  }
  else if(process.env.NODE_ENV === 'test'){
    console.log('DIDNT FIND MOCHA_IS_ACTIVE');
    return 'http://localhost:8000';
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

helpers.propagateCorsHeaders = function(request,response){
  if(!request.$corsToProxy["Access-Control-Allow-Credentials"]){
    response.set('x-cors-not-allowed',true);
    //overwrite originals cors headers
    for(var name in request.$corsToProxy){
      response.set(name,"");
    }
  }
  else{
    //set correct cors headers
    for(var name in request.$corsToProxy){
      response.set(name,request.$corsToProxy[name]);
    }
  }
};

module.exports = helpers;