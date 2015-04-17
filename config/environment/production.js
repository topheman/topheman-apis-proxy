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
    cors : [
      "*.topheman.com",
      "topheman.github.io",
      "topheman-react-es6-isomorphic.herokuapp.com"
    ],
    jsonp : "callback"
  },
  twitter : {
    active : true,
    cors : ["*.topheman.com","topheman.github.io"]
  }
};