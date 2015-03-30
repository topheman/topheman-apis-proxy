'use strict';

var path = require('path');
var _ = require('lodash');

if(!process.env.NODE_ENV){
  throw new Error("process.env.NODE_ENV missing - don't forget to specify your environment variables - see more at https://github.com/topheman/topheman-apis-proxy#run-in-local");
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..')
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});