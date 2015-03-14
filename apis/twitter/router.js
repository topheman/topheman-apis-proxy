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

var routes = {
  user_show_by_user_id: '/users/show/:user_id(\\d+)',
  user_show_by_screen_name: '/users/show/:screen_name(\\w+)',
  statuses_show_by_id: '/statuses/show/:id(\\d+)'
};

router.get('/', function (req, res) {
  res.set('Content-Type','text/html');
  res.render(__dirname+'/root.ejs', {
    layout: 'layout',
    title : apiDescription.title,
    description : apiDescription.description
  });
});

router.get('/*', function (req, res, next) {
  //remove leading slash (Twit won't take it) + remove extension to be compliant with the default rest api (though we response only with json)
  var url = req.path.substr(1).replace('.json','').replace('.xml','');
  T.get(url, req.query, function (err, data, response) {
    if (err) {
      next(err);
    }
    else {
      //transfer headers containing limit infos
      res.set('x-rate-limit-limit', response.headers['x-rate-limit-limit']);
      res.set('x-rate-limit-remaining', response.headers['x-rate-limit-remaining']);
      res.set('x-rate-limit-reset', response.headers['x-rate-limit-reset']);
      res.json(data);
    }
  });
});

module.exports = router;