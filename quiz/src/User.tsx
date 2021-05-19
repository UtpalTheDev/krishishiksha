import { useReduce } from "./Reducer-context";
import Chart from "react-google-charts";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div>Name- {user.name}</div>
      <div>Email- {user.email}</div>
      <div>Activity</div>
      {!attendancedata && "Loading"}
      {attendancedata && (
        <Chart
          style={{ width: "90%", minWidth: "400px" }}
          chartType="Calendar"
          loader={<div>Loading Chart</div>}
          data={attendancedata}
          options={{
            title: "Everyday number of quiz attended"
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </>
  );
}
