'use strict';

/**
 * Return an error with a 403 status to be catched by the error handler
 * @returns {Error}
 */
var getError403 = function () {
  var err = new Error('Forbidden');
  err.status = 403;
  return err;
};

/**
 * Will provide a wrapper of the next function
 * next(true) -> same as the next
 * next(false) -> passes an error with an http 403
 * @param {function} next
 * @return {function} Wrapper of the express's next
 */
var nextManaging403 = function (next) {
  return function (state) {
    if (state === true) {
      next();
    }
    else {
      next(getError403());
    }
  };
};

/**
 * Adds a middleware that will check for a token in your headers
 * Pass the following header example : "X-Auth-Token: mytoken" in your requests
 * The token can be static or dynamic (based on time or request for exemple)
 * In your config option add the attribute "token" and pass either of :
 * - a simple value such as 123 or "AZ34RFFGHH"
 * - a function like : function(token, request, next){
 *    //you could do a db check or even call an other api (this is why the next is here, not to stall)
 *    if("aaa" === token){
 *      next(true);//authorized
 *    }
 *    else{
 *      next(false);//will return http 403 Forbidden
 *    }
 * }
 * @param {Object} apiDescription
 * @param {Object} apiConfiguration
 * @param {Express.App} app
 */

function token(apiDescription, apiConfiguration, app) {
  if (typeof apiConfiguration.token === 'function') {
    app.use(apiDescription.endpoint, function (req, res, next) {
      apiConfiguration.token(req.get('X-Auth-Token'), req, nextManaging403(next));
    });
  }
  else if (typeof apiConfiguration.token !== 'undefined') {
    app.use(apiDescription.endpoint, function (req, res, next) {
      if (req.get('X-Auth-Token') == apiConfiguration.token) {
        next();
      }
      else {
        next(getError403());
      }
    });
  }
}
;

module.exports = token;