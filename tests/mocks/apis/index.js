/**
 * This module exports the proxy API description files for mocks
 * It's only meant to be used in tests
 */

var config = require('../../../config/environment');
var path = require('path');

var all = {
  one : require('./one'),
  home : require(path.resolve(config.root,'./apis/home'))
};

module.exports = all;