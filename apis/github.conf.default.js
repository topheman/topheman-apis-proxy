/*
 * This is the default configuration of the github handler
 * To make it work, copy this filt to github.conf.js (which will be gitignored and set your credentials there)
 * 
 * The cors entry accepts :
 * * true : CORS activated with full cross-origin
 * * false or [] (empty array) : CORS disactivated
 * * array of origins (example : ['example1.com','example2.com'] ) will activate cors only for those origins - for syntax : https://github.com/ybogdanov/express-cors#possible-hosts-specification
 */
module.exports = {
  "active" : true,
  "endpoint" : "/github",
  "router" : require("./github.router"),
  "cors" : [],
  "credentials" : {
    "clientId" : process.env.GITHUB_CLIENT_ID || "XXXXXX",
    "clientSecret" : process.env.GITHUB_CLIENT_SECRET || "XXXXXX"
  }
};