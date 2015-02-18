/*
 * This is the router in charge of the github api
 * Its handler and all of its behavior are described in github.conf.js
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({
    "list of apis" : []
  });
});

module.exports = router;
