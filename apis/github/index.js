/*
 * This is the description of your API proxy handler
 * 
 * It MUST provide an "endpoint" (which is the route where will be proxied the API calls)
 * You can provide a "description" key
 * 
 * It MUST provide "path" : __dirname
 * 
 * The logic of your handler MUST be in a "router.js" file in this folder
 * it MUST be a module that exports an express.Router
 * 
 */
'use strict';

module.exports = {
  "endpoint" : "/github",
  "description" : "This handler is a proxy to the public API of github, learn more at https://developer.github.com/v3/",
  "path" : __dirname
};