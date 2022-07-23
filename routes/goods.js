var express = require('express');
var router = express.Router();
var goods = require('../mock/goods.json')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json(goods)
});

module.exports = router;
