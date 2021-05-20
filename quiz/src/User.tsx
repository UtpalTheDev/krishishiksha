import { useReduce } from "./Reducer-context";
import Chart from "react-google-charts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import{Grid} from "@material-ui/core"
export function User() {
  const { user } = useReduce();
  let [attendancedata, setattendancedata] = useState<any | null>(null);
  let item = "2021-05-21";
  let dt = [new Date(item), 10];
  let initialdata = [
    [
      { type: "date", id: "Date" },
      { type: "number", id: "Won/Loss" }
    ]
  ];

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
    </>
  );
}
