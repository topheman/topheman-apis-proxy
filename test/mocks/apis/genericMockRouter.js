/*
 * This router is used in all the mock routers
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function(req, res) {
  res.json({
    baseUrl : req.baseUrl,
    hostname : req.hostname,
    originalUrl : req.originalUrl,
    params : req.params,
    path : req.path,
    query : req.query
  });
});

module.exports = router;
