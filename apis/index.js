/**
 * This module exports the config of all the apis
 * If you add a new api, add a new entry
 */

var path = require('path');

var all = {
  github : require('./github.conf')
};

module.exports = all;