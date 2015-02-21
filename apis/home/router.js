var express = require('express');
var router = express.Router();
var config = require('../../config/environment');
var packageJson = require('../../package');

var sendAs = {
  html : function(res,infos){
    var linkify = require("html-linkify");
    for(var api in infos.apis){
      infos.apis[api].description = linkify(infos.apis[api].description);
    }
    res.render('home',infos);
  },
  json : function(res,infos){
    res.json(infos);
  },
  xml : function(res,infos){
    var js2xmlparser = require("js2xmlparser");
    res.set('Content-Type', 'text/xml');
    res.send(js2xmlparser("topheman-apis-proxy",infos));
  }
};
var formatsAccepted = Object.keys(sendAs);

/* GET home page. */
router.get('/', function(req, res) {
  var apis = require('../../apis')(req.app.get('env'));
  var port = req.app.settings.port;
  var baseEndpoint = req.protocol + "://" + req.hostname + ( port == 80 || port == 443 ? '' : ':'+port );
  var infos = {
    "description" : packageJson.description,
    "repo" : packageJson.repository.url,
    "author" : packageJson.author,
    "apis" : {}
  };
  for(var api in apis){
    if(typeof config[api] === 'object' && apis[api].endpoint !== '/' && config[api].active === true){
      infos.apis[api] = {
        "endpoint" : baseEndpoint+apis[api].endpoint,
        "description" : apis[api].description
      };
    }
  }
  
  if(req.query.format !== "" && formatsAccepted.indexOf(req.query.format) > -1){
    sendAs[req.query.format](res,infos);
  }
  else{
    res.format({
      'text/html' : function(){
        sendAs.html(res,infos);
      },
      'application/json' : function(){
        sendAs.json(res,infos);
      },
      'application/xml' : function(){
        sendAs.xml(res,infos);
      }
    });
  }
});

module.exports = router;
