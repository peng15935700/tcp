//定义上传商品字段
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const productSchema=new Schema({
    name:{type:String,required:true},
    age:Number,
    identity:Number,
    phone:Number,
    message:String,
    createAt:{type:Date,default:Date.now()},
    updateAt:{type:Date,default:new Date()}
});

//指定数据库中的存储集合
const product=mongoose.model("product",productSchema);
//暴露模块
module.exports=product;


//module.exports=mongoose.model("product",productSchema);;
