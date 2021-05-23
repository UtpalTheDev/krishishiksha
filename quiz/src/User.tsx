import { useReduce } from "./Reducer-context";
import Chart from "react-google-charts";
import  { useEffect, useState } from "react";
import axios from "axios";
import{Grid} from "@material-ui/core"

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function User() {
  const { user } = useReduce();
  const [attendancedata, setattendancedata] = useState<any | null>(null);

  const [monthlyperf,setmonthlyperf]=useState<number>(0);
  const [yearlyperf,setyearlyperf]=useState<number>(0);
  const [dailyperf,setdailyperf]=useState<number>(0);
 
  let item = "2021-05-21";
  let dt = [new Date(item), 10];
  let initialdata = [
    [
      { type: "date", id: "Date" },
      { type: "number", id: "Won/Loss" }
    ]
  ];
console.log("yearly",yearlyperf);
console.log("daily",dailyperf);
console.log("monthly",monthlyperf);

  useEffect(() => {
    (async function () {
      console.log("id", user._id);
      try {
        let response = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/attendance",
          {
            userid: user._id
          }
        );
        console.log("response", response.data);
        if (response.status === 200) {
          response.data.map((item:any, index:any) => {
            item[0] = new Date(item[0]);
            return item;
          });
          setattendancedata([...initialdata, ...response.data]);
        }

        let monthlydata = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/monthlyperformance",
          {
            userid: user._id
          }
        );
        if(monthlydata.status===200){
          if(monthlydata.data>0){
            setmonthlyperf(Math.round(monthlydata.data))
          }
          else{
            setmonthlyperf(0)
          }
        }
        let yearlydata = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/yearlyperformance",
          {
            userid: user._id
          }
        );
        if(yearlydata.status===200){
          if(yearlydata.data>0){
            setyearlyperf(Math.round(yearlydata.data))
          }
          else{
            setyearlyperf(0)
          }
        }
        let dailydata = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/dailyperformance",
          {
            userid: user._id
          }
        );
        if(dailydata.status===200){
          if(dailydata.data>0){
            setdailyperf(Math.round(dailydata.data))
          }
          else{
            setdailyperf(0)
          }
        }

      } catch (error) {
        console.log("attendancerror", error);
      }
    })();
  }, [user]);

  return (
    <>
    <Grid container justify="center" direction="column" style={{width:"100vw"}} spacing={3}>
      <Grid item><div>Name- {(user.name).toLocaleUpperCase()}</div></Grid>
      
      <Grid item> <div>Email- {user.email}</div></Grid>

      <Grid item style={{textAlign:"center"}}> <div>Activity</div></Grid>

     <Grid item style={{overflowX:"auto",width:"inherit",justifyContent:"center"}}>{!attendancedata && "Loading"}
      {attendancedata && (
        <Chart
          width={"950px"}
          height={"200px"}
          style={{margin:"0 auto"}}
          chartType="Calendar"
          loader={<div>Loading Chart</div>}
          data={attendancedata}
          options={{
            title: "Everyday number of quiz attended"
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}</Grid>
     
      </Grid>
      <Grid container style={{margin:"4rem 0",padding:"0 2rem"}} spacing={5} justify="center">
     <Grid item lg={3} md={4} sm={5} justify="center">
     <div style={{width:"100%"}}>
        <CircularProgressbar value={monthlyperf} text={`${monthlyperf}%`} />
      </div> 
        <div style={{textAlign:"center"}}>Monthly Performance</div>
  
     </Grid>
     <Grid item lg={3} md={4} sm={5}>
     <div style={{width:"100%"}}> 
        <CircularProgressbar value={yearlyperf} text={`${yearlyperf}%`} />
      </div> 
      <div style={{textAlign:"center"}}>Yearly Performance</div>
 
      </Grid>    
     <Grid item lg={3} md={4} sm={5}>
       <div style={{width:"100%"}}> 
         <CircularProgressbar value={dailyperf} text={`${dailyperf}%`} />
       </div>
       <div style={{textAlign:"center"}}>Daily Performance</div>
       
      </Grid> 

     </Grid>

    </>
  );
}
