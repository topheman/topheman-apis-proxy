var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var port = req.app.settings.port;
  var baseEndpoint = req.protocol + "://" + req.hostname + ( port == 80 || port == 443 ? '' : ':'+port );
  res.json({
    "description" : "This is server is a proxy to different public APIs to ease frontend POC development",
    "constraints" : "",
    "repo" : "",
    "apis" : {
      "twitter" : {
        "endpoint" : baseEndpoint+"/twitter"
      },
      "github" : {
        "endpoint" : baseEndpoint+"/github"
      }
    }
  });
});

module.exports = router;
