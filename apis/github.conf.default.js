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