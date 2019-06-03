const express = require('express');
const router = express.Router();
const md5 = require('md5');
const user = require('../models/user');
//get /login  login.ejs
router.get('/',function(req,res){
    res.render('login');
})

router.post('/',function(req,res){
    //提交数据的获取
    user.find({
        username:req.body.username,
        password:md5(req.body.password)
    },function(err,result){
        if(err) throw err;
        if(result.length){//匹配成功
            req.session.username = req.body.username;
            req.session.password = md5(req.body.password);
            res.redirect('/add/list');
        }else{
            res.render('/login');
        }
    })
    
    
    // var usrInstance = new user({...req.body});
    //usrInstance.save();//保存数据

    //从服务器发送数据给客服端   客户端保存在cookie中
    //以后客服端发送的请求里 一直带着凭证cookie（值）
    // res.cookie("username",req.body.username,{maxAge:60*1000});//设置保存过期时间maxAge
    // res.cookie("password",req.body.password,{maxAge:60*1000,signed:true});

})







module.exports = router;