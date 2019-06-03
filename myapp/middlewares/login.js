//判断登录权限
//如果你登录 req.cookies
//数据库匹配

module.exports = function(req,res,next){
    // if(req.cookies.username && req.signedCookies.password){
    //     //登录成功
    //      next();
    // }else{
    //     //登陆失败  就重定向到登录页面
    //     res.redirect('/login');
    // }


    if(req.session.username&&req.session.password){
        next()
    }else{
        res.redirect('/login');
    }
}