var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd,
  }
  User.findOne(param,(err,doc) => {
    if(err) {
      res.json({status:1,msg:err.message});
    } else {
      if (doc) {
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000 * 60 * 60
        });
        // req.session.user = doc;
        res.json({status:'0',msg:"",result:{
          userName:doc.userName
        }})
      }
    }
  });
  
});

// 登出接口
router.post('/logout',(req,res,next) => {
  res.cookie('userId',"",{
    path:'/',
    maxAge: -1
  });
  res.json({status:0,msg:"",result:""});
});

// 购物车列表
router.get('/cartList',(req,res,next) => {
  const userId = req.cookies.userId;
  console.log('userId = ',userId);
  User.findOne({userId:userId},(err,doc) => {
    if (err) {
      res.json({status:1,msg:err.message,result:''});
    } else {
      if (doc) {
        res.json({status:0,msg:'',result:doc.cartList});
      }
    }
  })
})
module.exports = router;
