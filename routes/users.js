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
          res.setHeader('Set-Cookie',[`userId=${doc.userId}`])
          res.cookie("userId",doc.userId)
          .json({status:'0',msg:"",result:{
          userName:doc.userName
        }});
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

// 删除购物车内容
router.post('/cartDel', (req,res,next) => {
  const userId = req.cookies.userId,productId = req.body.productId;
  // 删除User中的cartList，productId的子文档
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },(err, doc) => {
    if (err) {
      res.json({status:'1',msg:err.message,result:''})
    } else {
      res.json({status:0,msg:"",result:''})
    }
  });
})

// 购物车全选
router.post('/editCheckAll',(req,res,next) => {
  const userId = req.cookies.userId,
    checkAll = req.body.checkAll ? '1' : '0'
    User.findOne({userId:userId},(err,doc) => {
      if (err) {
        res.json({status:1,msg:err.message,result:""});
      } else {
        if (doc ) {
          doc.cartList.forEach((item) => {
            item.checked = checkAll;
          });
          User.save((err1,doc1) => {
            if (err) {
              res.json({status:1,msg:err.message,result:""})
            } else {
              res.json({status:0,msg:"",result:'suc'})
            }
          })
        }
        res.json({status:'0',msg:"",result:"suc"});
      }
    });
});

// 查询用户地址
router.get('/addressList',(req,res,next) => {
  const userId = req.cookies.userId;
  User.findOne({userId:userId},(err,doc) => {
    if (err) {
      res.json({status:1,msg:err.message,result:""})
    } else {
      res.json({status:0,msg:"",result:doc.addressList});
    }
  })
})

// 设置默认地址接口
router.post('/setDefault',(req,res,next) => {
  const userId = req.cookies.userId,
    addressId = req.body.addressId;
  if (!addressId) {
    res.json({status:'1003',msg:"addressId is null",result:""})
  } else {
    User.findOne({userId},(err,doc) => {
      if (err) {
        res.json({status:1,msg:err.message,result:""});
      } else {
        const addressList = doc.addressList;
        addressList.forEach(item => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
        // 保存回去数据库
        doc.save((err1,doc1) => {
          if (err) {
            res.json({status:1,msg:err1.message,result:""});
          } else {
            res.json({status:0,msg:"",result:""})
          }
        });
      }
    }); // user_findOne
  }

});
module.exports = router;
