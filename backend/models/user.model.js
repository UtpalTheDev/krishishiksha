const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const userSchema=new mongoose.Schema({

    name: String,
    email:String,
    password:String
})
//model creation
const usermodel=mongoose.model('user',userSchema);

module.exports={usermodel}