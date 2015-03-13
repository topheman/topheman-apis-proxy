'use strict';

/**
 * Adds a middleware that checks for a param in the get request that matches the name set in "jsonp" value of config
 * If match will return http 403
 * @param {Object} apiDescription
 * @param {Object} apiConfiguration
 * @param {Express.App} app
 */

function disableJsonp(apiDescription, apiConfiguration, app) {
  if (typeof apiConfiguration.jsonp === 'string') {
    app.use(apiDescription.endpoint, function (req, res, next) {
      if (req.query[apiConfiguration.jsonp]) {
        var error = new Error('Forbidden : No JSONP allowed');
        error.status = 403;
        next(error);
      }
      else {
        next();
      }
    });
  }
}
;

module.exports = disableJsonp;