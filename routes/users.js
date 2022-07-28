var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd,
  }
  console.log('parsm = ',param)
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
        // console.log(req.session)
        res.json({status:'0',msg:"",result:{
          userName:doc.userName
        }})
      }
    }
  });
  
});

module.exports = router;
