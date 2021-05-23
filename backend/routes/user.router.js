const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const {usermodel}=require("../models/user.model.js")

router.route('/infowithcred')
 .post(async (req, res) => {
   try{
     let {email,password}=req.body;
     const user=await usermodel.findOne({email,password}).select("_id name email");
     res.status(200).json(user)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get user",errormessage:error.message})
   }
  
})


router.route('/save')
 .post(async (req, res) => {
   try{
     let {name,email,password}=req.body;
     let user= await usermodel.findOne({email:email});
     if(user){
       res.status(406).json({message:"use other emailid"})
     }
     else{
      let createduser=await usermodel.create({
     name,email,password});
     console.log("user",{_id:createduser._id,name:createduser.name,email:createduser.email})
     res.status(200).json({_id:createduser._id,name:createduser.name,email:createduser.email})
     }
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to save user",errormessage:error.message})
   }
  
})

router.route('/infowithtoken')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const user=await usermodel.findOne({_id:userid}).select("_id name email");
     res.status(200).json(user)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get user",errormessage:err.message})
   }
  
})

module.exports=router;