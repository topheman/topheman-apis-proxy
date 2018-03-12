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
  "endpoint" : "/npm-registry",
  "description" : "This handler is a proxy to the public registry of npm, learn more at https://docs.npmjs.com/misc/registry",
  "path" : __dirname
};
