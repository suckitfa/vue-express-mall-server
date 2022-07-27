var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')
// 链接mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mall')
mongoose.connection.on('connected',() => console.log("链接成功"))
mongoose.connection.on('error',() => console.log("链接错误"))
mongoose.connection.on('disconnected',() => console.log("链接断开"))
/* GET home page. */
router.get('/', function(req, res, next) {
    // 获取参数sort
    let page = req.param("page")
    let pages = req.param("page")
    console.log('pages = ',pages)
    let pageSize = req.param("page")
    let sort = req.param("sort")
    let skip = (page - 1) * pageSize; // 分页计算公式
    let priceLevel = req.param('priceLevel');
    let priceGt = '',priceLte = '';
    let params = {}
    if (priceLevel !== 'all') {
        switch(priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 5000;
        }
        // 构造
        params = {
            salePrice: {
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    var goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},(err,doc) => {
        if (err) {
            res.json({
                status:1,
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
    // 查找所有的商品，返回商品列表
    // Goods.find({},(err,doc) => {
    //     if (err) {
    //         res.json({
    //             status:'1',
    //             msg:err.message
    //         }) 
    //     } else {
    //         res.json({
    //             status:0,
    //             msg:"",
    //             result:{
    //                 count:doc.length,
    //                 list:doc,
    //             }
    //         })
    //     }
    // })
});

module.exports = router;
