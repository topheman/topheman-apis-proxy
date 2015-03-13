'use strict';

var expressCors = require('express-cors');
var cors = require('cors');

/**
 * 
 * @param {Object} apiConfiguration
 * @returns {apiConfiguration.cors|Array|Boolean} An object that can be passed to cors or express-cors
 */
function getCorsOptions(apiConfiguration){
  var result = false;
  if(typeof apiConfiguration.cors === 'undefined' || apiConfiguration.cors === false){
    result = false;
  }
  else if(apiConfiguration.cors === true){
    result = true;
  }
  else if(apiConfiguration.cors instanceof Array){
    if(apiConfiguration.cors.length === 0){
      result = false;
    }
    else if(apiConfiguration.cors.indexOf('*') > -1){
      result = true;
    }
    else{
      result = apiConfiguration.cors;
    }
  }
  else if(typeof apiConfiguration.cors === 'string'){
    result = [apiConfiguration.cors];
  }
  return result;
}

/**
 * Adds a middleware that will block cors, based on api configuration
 * If match will return http 403
 * @param {Object} apiDescription
 * @param {Object} apiConfiguration
 * @param {Express.App} app
 */

function addCorsPlugin(apiDescription, apiConfiguration, app){
  //CORS setup
  var corsOptionsFromConfig = getCorsOptions(apiConfiguration);
  if(corsOptionsFromConfig === true){
    app.use(apiDescription.endpoint,cors());
  }
  else if(corsOptionsFromConfig instanceof Array && corsOptionsFromConfig.length > 0){
    app.use(apiDescription.endpoint,expressCors({
      allowedOrigins : corsOptionsFromConfig
    }));
  }
};

module.exports = addCorsPlugin;