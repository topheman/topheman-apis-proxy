/*
 * This is the router in charge of the delay endpoint
 */

'use strict';

var express = require('express');
var router = express.Router();
var helpers = require('../../utils/helpers');
var request = require('request');

var CURRENT_HANDLER_BASE_PATH = require('./index').endpoint;

//ensure trailing slashe
router.use(function (req, res, next) {
  if (req.originalUrl.substr(-1) !== '/' && req.originalUrl.length < (CURRENT_HANDLER_BASE_PATH.length + 1)) {
    res.redirect(301, req.originalUrl + "/");
  }
  else {
    next();
  }
});

router.get(`${CURRENT_HANDLER_BASE_PATH}/:milliseconds/*`, (req, res) => {
  const proxyUrl = req.originalUrl.replace(`${req.baseUrl}/${req.params.milliseconds}/`, "")

  let delay = parseInt(req.params.milliseconds, 10);
  if (isNaN(delay) || delay < 0 || delay > 20000) {
    delay = 0;
  }

  var proxyReq = request(proxyUrl, (error) => {
    if (error) {
      console.error(error);
    }
  });

  if (delay) {
    proxyReq.on('response', (proxyRes) => {
      proxyRes.pause();
      setTimeout(() => {
        helpers.propagateCorsHeaders(req,res);
        proxyRes.pipe(res);
      }, delay);
    })
  }
  else {
    helpers.propagateCorsHeaders(req,res);
    req.pipe(proxyReq).pipe(res);
  }

});

module.exports = router;
