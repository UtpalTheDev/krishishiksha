const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const {datamodel}=require("../models/data.model.js")

function date(dateinfo=new Date()){
  return(`${dateinfo.getFullYear()}-${dateinfo.getMonth()+1}-${dateinfo.getDate()}`)
}
function month(dateinfo=new Date()){
  return(`${dateinfo.getMonth()+1}`)
}function year(dateinfo=new Date()){
  return(`${dateinfo.getFullYear()}`)
}
router.route('/')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const data=await datamodel.findOne({user:userid}).populate({path:"user",select:["name","email","password"]});
     res.json(data)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get data",errormessage:error.message})
   }
 })

 router.route("/save")
  .post(async (req, res) => {
   try{
     let {userid,quizdata}=req.body;
     console.log(userid,quizdata);
     const data=await datamodel.findOne({user:userid});
     console.log({data});
     if(data)
     {
       const duplicatedata=data.dataset.find(item=>(date(item.Date)===date()&& item.category===quizdata.category));
       if(duplicatedata){
        data.dataset.remove(duplicatedata);
        await data.save();
        }
       data.dataset.push(quizdata);
       await data.save();
     }
     else{
     data=await datamodel.create({user:userid,dataset:[quizdata]});
     }
     res.json(data)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to save",errormessage:error.message})
   }
 })


router.route('/stat')
 .post(async (req, res) => {
   try{
     let {userid,category}=req.body;
     const data=await datamodel.findOne({user:userid});
     const statdata=data.dataset.filter(item=>item.category===category);
     const sevendaysdata=statdata.filter(item => {
      return Math.floor( Math.abs( new Date() - new Date( item.Date )) / 86400000)<= 7});

     const graphdata=sevendaysdata.map(item=>{
     return[date(item.Date),item.correct,item.wrong]
      })
    res.status(200).json(graphdata)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get statistics data",errormessage:error.message})
   }
 })
 router.route('/attendance')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const data=await datamodel.findOne({user:userid});
     let datearr=data.dataset.map(item=>date(item.Date));
     datearr=datearr.filter((item,index) => datearr.indexOf(item) === index);
    const attendancedata=datearr.map(item => {
    let datewisedata=data.dataset.filter(eachitem => item === date(eachitem.Date));
    return [new Date(item),datewisedata.length]
     })
     res.json(attendancedata)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get attendance data",errormessage:error.message})
   }
 })
router.route('/monthlyperformance')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const data=await datamodel.findOne({user:userid});
     const statdata=data.dataset.filter(item=>month(item.Date)===month()&&year(item.Date)===year());
      const reducedtotalscore=statdata.reduce((total,item)=>{console.log("total",item.totalscore)
      return total+item.totalscore},0)
      const reducedobtainscore=statdata.reduce((total,item)=>total+item.score,0)
      const percentage=(reducedobtainscore / reducedtotalscore)*100
      res.json(percentage)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get monthly performance data",errormessage:error.message})
   }
 })
 router.route('/yearlyperformance')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const data=await datamodel.findOne({user:userid});
     const statdata=data.dataset.filter(item=>year(item.Date)===year());
     const reducedtotalscore=statdata.reduce((total,item)=>{console.log("total",item.totalscore)
     return total+item.totalscore},0)
     const reducedobtainscore=statdata.reduce((total,item)=>total+item.score,0)
     const percentage=(reducedobtainscore / reducedtotalscore) * 100
     res.json(percentage)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get yeraly performancedata",errormessage:error.message})
   }
 })
 router.route('/dailyperformance')
 .post(async (req, res) => {
   try{
     let {userid}=req.body;
     const data=await datamodel.findOne({user:userid});
     const statdata=data.dataset.filter(item=>date(item.Date)===date());
      const reducedtotalscore=statdata.reduce((total,item)=>{console.log("total",item.totalscore)
      return total+item.totalscore},0)
      const reducedobtainscore=statdata.reduce((total,item)=>total+item.score,0)
      const percentage=(reducedobtainscore/reducedtotalscore)*100
      res.json(percentage)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get daily performance data",errormessage:error.message})
   }
 })
 module.exports=router;