'use strict';

/**
 * Adds a middleware that delays the response (to simulate network difficulties)
 * In your config option add the attribute "delay" with the number of milliseconds
 * @param {Object} apiDescription
 * @param {Object} apiConfiguration
 * @param {Express.App} app
 */

function delay(apiDescription, apiConfiguration, app) {
  if (typeof apiConfiguration.delay === 'number') {
    app.use(apiDescription.endpoint, function (req, res, next) {
      res.set('x-delay-milliseconds',apiConfiguration.delay);
      setTimeout(next,apiConfiguration.delay);
    });
  }
}
;

module.exports = delay;