const mongoose=require('mongoose');
require("mongoose-type-url");
//schema

const dataSchema=new mongoose.Schema({
user:{type: mongoose.Schema.Types.ObjectId,ref:'user'},
dataset:[{
  category:String,
  score:Number,
  correct:Number,
  wrong:Number,
  no_of_question:Number,
  totalscore:Number,
  Date:Date

}]
})
//model creation
const datamodel=mongoose.model('data',dataSchema);

module.exports={datamodel}