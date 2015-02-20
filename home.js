var express = require('express');
var router = express.Router();
var config = require('./config/environment');

/* GET home page. */
router.get('/', function(req, res) {
  var apis = require('./apis');
  var port = req.app.settings.port;
  var baseEndpoint = req.protocol + "://" + req.hostname + ( port == 80 || port == 443 ? '' : ':'+port );
  var json = {
    "description" : "This is server is a proxy to different public APIs to ease frontend POC development",
    "constraints" : "",
    "repo" : "",
    "apis" : {}
  };
  for(var api in apis){
    if(typeof config[api] === 'object' && config[api].active === true){
      json.apis[api] = {
        "endpoint" : baseEndpoint+apis[api].endpoint
      };
    }
  }
  res.json(json);
});

module.exports = router;
