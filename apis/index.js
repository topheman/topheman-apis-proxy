/**
 * This module exports the proxy API description files,
 * If you create a new API :
 * - add it to this module and specify the default configurations
 *   in /config/environment/{development.js|production.js} , using the same key
 * - add the environment variable you use for your API keys in /config/local.env.default.js
 *   (and of course local.env.js if you have existing one)
 */

var all = {
  github : require('./github'),
  home : require('./home')
};

function getApisDescription(environment){
  if(environment === 'test'){
    return require('../tests/mocks/apis');
  }
  else{
    return all;
  }
}

module.exports = getApisDescription;