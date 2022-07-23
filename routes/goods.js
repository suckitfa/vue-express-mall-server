var express = require('express');
var router = express.Router();
var goods = require('../mock/goods.json')
/* GET home page. */
router.get('/goodsList', function(req, res, next) {
    res.render('index',{
        name:"fuck"
    })
});

module.exports = router;
