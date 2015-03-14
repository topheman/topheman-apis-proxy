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
  "endpoint" : "/twitter",
  "title" : "Twitter API",
  "description" : "This handler gives you access to a subset of the public API of Twitter, learn more at https://dev.twitter.com",
  "path" : __dirname
};