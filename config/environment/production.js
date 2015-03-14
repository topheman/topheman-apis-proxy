'use strict';

// Production specific configuration
// ==================================
module.exports = {
  home : {
    active : true,
    cors : ["*.topheman.com","topheman.github.io"]
  },
  github : {
    active : true,
    cors : ["*.topheman.com","topheman.github.io"],
    jsonp : "callback"
  },
  twitter : {
    active : true,
    cors : ["*.topheman.com","topheman.github.io"]
  }
};