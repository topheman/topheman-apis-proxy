'use strict';

var expressCors = require('express-cors');
var cors = require('cors');

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