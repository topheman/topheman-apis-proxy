/**
 * This module exports the proxy API description files for mocks
 * It's only meant to be used in tests
 */

'use strict';

var config = require('../../../config/environment');
var path = require('path');

var all = {
  github : require('../../../apis/github'),
  githubApiMock : require('./githubApiMock'),
  twitter : require('../../../apis/twitter'),
  testActive1 : require('./testActive1'),
  testActive2 : require('./testActive2'),
  testActive3 : require('./testActive3'),
  testActive4 : require('./testActive4'),
  testCorsActive1 : require('./testCorsActive1'),
  testCorsActive2 : require('./testCorsActive2'),
  testCorsActive3 : require('./testCorsActive3'),
  testCorsActive4 : require('./testCorsActive4'),
  testCorsActive5 : require('./testCorsActive5'),
  testCorsPattern1 : require('./testCorsPattern1'),
  testCorsPattern2 : require('./testCorsPattern2'),
  testCorsPattern3 : require('./testCorsPattern3'),
  testDelay : require('./testDelay'),
  testJsonp : require('./testJsonp'),
  testToken1 : require('./testToken1'),
  testToken2 : require('./testToken2'),
  home : require(path.resolve(config.root,'./apis/home'))
};

module.exports = all;