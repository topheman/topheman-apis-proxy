var express = require('express');
var router = express.Router();
var config = require('../../config/environment');

/* GET home page. */
router.get('/', function(req, res) {
  var apis = require('../../apis')(req.app.get('env'));
  var port = req.app.settings.port;
  var baseEndpoint = req.protocol + "://" + req.hostname + ( port == 80 || port == 443 ? '' : ':'+port );
  var infos = {
    "description" : [
      "This server is a proxy to different public APIs to ease frontend POC development.",
      "Since public APIs need secret keys and some backend development, you'll make this once and for all,",
      "and then you will be able to focus on your front."
    ].join('\n'),
    "repo" : "https://github.com/topheman/topheman-apis-proxy",
    "author" : {
      "name" : "Christophe Rosset",
      "nickname" : "topheman",
      "twitter" : "https://twitter.com/topheman",
      "github" : "https://github.com/topheman"
    },
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
  
  //OK went a little nuts ... it was fun to add xml support in top of html and json ;-)
  
  function sendHtml(res,infos){
    var linkify = require("html-linkify");
    for(var api in infos.apis){
      infos.apis[api].description = linkify(infos.apis[api].description);
    }
    res.render('home',infos);
  }
  
  function sendJson(res,infos){
    res.json(infos);
  }
  
  function sendXml(res,infos){
    var js2xmlparser = require("js2xmlparser");
    res.set('Content-Type', 'text/xml');
    res.send(js2xmlparser("topheman-apis-proxy",infos));
  }
  
  if(req.accepts('html') && req.query.format !== 'json' && req.query.format !== 'xml'){
    sendHtml(res,infos);
  }
  else if(req.query.format === "json" || req.query.format === "xml"){
    if(req.query.format === "json"){
      sendJson(res,infos);
    }
    else if(req.query.format === "xml"){
      sendXml(res,infos);
    }
  }
  else if(req.accepts('json')){
    sendJson(res,infos);
  }
  else if((req.query.format !== 'json' && req.query.format === 'xml') || req.accepts('xml')){
    sendXml(res,infos);
  }
});

module.exports = router;
