'use strict';

module.exports = {
  "endpoint" : "/githubApiMock",
  "description" : "This is the github mock handler api used in tests as if it were the real https://api.github.com, proxied by the real handler /github (lanched in test mode - offline)",
  "path" : __dirname
};