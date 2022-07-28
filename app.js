var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// 拦截用户是否登入
app.use(function(req,res,next) {
    console.log('originUrl = ',req.originUrl)
    if (req.cookies.userId) {
        next();
    } else {
        // 使用黑名单来控制访问权限
        const blackList = ['/goods/addCart']
        if (!blackList.includes(req.originalUrl)) {
            next()
        } else {
            res.json({status:1,msg:"用户未登入",result:""});
        }
    }
})
// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter)

module.exports = app;
