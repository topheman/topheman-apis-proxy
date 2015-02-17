/*
 * This is the default configuration of the github handler
 * To make it work, copy this filt to github.conf.js (which will be gitignored and set your credentials there)
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