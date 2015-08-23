var express = require('express');
var router = express.Router();
var router2 = express.Router();
router2.use(function(req,res,next){
    console.log('index router2 use1');
    next();
});

router.use(function(req,res,next){
    console.log('index use1');
    next();
});
router.use('/',router2);
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('get index');
    res.send('index');
});

module.exports = router;
