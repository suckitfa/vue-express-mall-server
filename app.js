var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods')
var app = express();

var blackList = require('./config/blackList')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// 拦截用户是否登入
app.use(function(req,res,next) {
    console.log('originUrl = ',req.originalUrl)
    console.log('blackList = ',blackList);
    if (req.cookies.userId) {
        next();
    } else {
        if (blackList.some(item => req.originalUrl.indexOf(item))) {
            res.json({status:1,msg:"用户未登入",result:""});
        } else {
            next();
        }
    }
})
// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter)

module.exports = app;
