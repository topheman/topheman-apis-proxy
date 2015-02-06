var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({
    "list of apis" : []
  });
});

module.exports = router;
