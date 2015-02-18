/**
 * This module exports the proxy apis,
 * If you create one :
 * - add it to this module and specify the default configurations
 *   in /config/environment/{development.js|production.js} , using the same key
 * - add the environment variable you use for your API keys in /config/local.env.default.js
 *   (and of course local.env.js if you have existing one)
 */

var path = require('path');

var all = {
  github : require('./github')
};

module.exports = all;