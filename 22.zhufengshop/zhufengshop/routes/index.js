var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/index', { title: '珠峰商城' });
});

module.exports = router;
