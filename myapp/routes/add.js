const express = require('express');
const path = require('path');
const formidable = require('formidable');
const product=require("../models/product");
const login = require('../middlewares/login');//判断权限的中间件
const router = express.Router();

router.get("/", function (req, res) {
    res.render("add");
})

router.post('/',login, function (req, res) {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        //保存数据放到数据库
        var obj = {//组装数据
            ...fields,
            pic: "/" + path.basename(files.pic.path)
        }
        var productIstance=new product(obj);//集合的实例  一个文档  一条数据
        productIstance.save();//保存数据
        // productIstance.save(function(err){
        //     if(err) throw err;
        //     console.log("保存成功");
        // })
        res.redirect('/add/list');
    })
})

router.get('/list', function (req, res) {
    //获取cookie
    console.log(req.cookies);
    //console.log(arr);

    //获取数据库数据
    product.find({},function(err,results){
        if(err) throw err;
        res.render('list', {arr:results})
    })
})


//查询
router.get("/list/queryp", function (req, res) {   
     //console.log(req.query.name);    
    product.find({ "name": req.query.name }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('list', { arr: result })
    })
})



module.exports = router;