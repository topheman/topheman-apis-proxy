/* 
 * This module emulates the "twit" module for test purposes
 * Only the few features I needed to test are implemented
 */

//mock data (always return the same)
var error = null;
var data = require('./data.json');//mock data
var response = {
  headers : {
    "x-rate-limit-limit" : 180,
    "x-rate-limit-remaining" : 179,
    "x-rate-limit-reset" : 1426357885
  }
};

var Twitt = function (credentials) {
  this.credentials = credentials;
};

/**
 * 
 * @param {string} url
 * @param {object} params
 * @param {function} callback function (err, data, response)
 * @returns {undefined}
 */
Twitt.prototype.get = function (url, params, callback) {
  //don't bother with url or params, always return the same data and response
  setTimeout(function(){
    callback.call({},error,data,response);
  },0);//setTimeout to keep consistancy with an asynchronous response
};

module.exports = Twitt;