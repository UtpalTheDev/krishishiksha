const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {questionmodel}=require("../models/question.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const question=await questionmodel.find({});
     res.status(200).json(question)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get questions",errormessage:error.message})
   }
  
})
router.route('/save')
 .post(async (req, res) => {
   try{
    let {id}=req.body;
     const question=await questionmodel.create({id});
     res.status(200).json(question)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get questions",errormessage:error.message})
   }
  
})



module.exports=router;