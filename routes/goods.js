var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')
// 链接mongoDB
mongoose.connect('mongodb://127.0.0.1:2701/mall')
mongoose.connection.on('connected',() => console.log("链接成功"))
mongoose.connection.on('error',() => console.log("链接错误"))
mongoose.connection.on('disconnected',() => console.log("链接断开"))
/* GET home page. */
router.get('/', function(req, res, next) {
    Goods.find({},(err,doc) => {
        if (err) {
            res.json({
                status:'1',
                msg:err.message
            }) 
        } else {
            res.json({
                status:0,
                msg:"",
                result:{
                    count:doc.length,
                    list:doc,
                }
            })
        }
    })
});

module.exports = router;
