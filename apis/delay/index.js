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
  "endpoint" : "/delay",
  "description" : "This handler acts as an endpoint that will let you delay responses. Example call to delay of 1000ms: /delay/1000/https://cdn.foo.com/my-img.jpg (might be sensible to trailing slashes)",
  "path" : __dirname
};
