/*
 * This is the router in charge of the twitter api
 */

'use strict';

var express = require('express');
var router = express.Router();
var Twit = require('twit');
var apiDescription = require('./index');

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.render(__dirname + '/root.ejs', {
    layout: 'layout',
    title: apiDescription.title,
    description: apiDescription.description
  });
});

router.get('/*', function (req, res, next) {
  //remove leading slash (Twit won't take it) + remove extension to be compliant with the default rest api (though we response only with json)
  var url = req.path.substr(1).replace('.json', '').replace('.xml', '');
  T.get(url, req.query, function (err, data, response) {
    if (err) {
      next(err);
    }
    else {
      //prevent browser to cache request

      //twitter returns data without cache control aka : always HTTP 200
      //from our side, if we leave cache control, the request to twitter will be done,
      //but since our express server delivers cache control headers to the client,
      //it will deliver 304 then the browser won't care about the response

      //HACK to workaround the framework sending e-tags and "304 NOT MODIFIED" responses
      //sorry, no right way to do it, more here : http://stackoverflow.com/a/19947147/2733488
      req.method = "NONE"; // was "GET"

      //transfer headers containing limit infos
      res.set('x-rate-limit-limit', response.headers['x-rate-limit-limit']);
      res.set('x-rate-limit-remaining', response.headers['x-rate-limit-remaining']);
      res.set('x-rate-limit-reset', response.headers['x-rate-limit-reset']);

      //finally send fresh data
      res.json(data);
    }
  });
});

module.exports = router;