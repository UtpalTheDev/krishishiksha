import { useReduce } from "./Reducer-context";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-google-charts";
export function Learninggraph() {
  let { data, user } = useReduce();
  let [statdata, setstatdata] = useState<any | null>(null);
  const initialdata = [["x", "coorect", "wrong"]];
  useEffect(() => {
    (async function () {
      console.log("id", user._id);
      try {
        let response = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/stat",
          {
            userid: user._id,
            category: "Marvel"
          }
        );
        if (response.status === 200) {
          setstatdata([...initialdata, ...response.data]);
        }
        return () => {
          setstatdata(null);
        };
      } catch (error) {
        console.log("error");
      }
    })();
  }, []);
  console.log("kjkjj", statdata);
  return (
    <>
      {statdata && (
        <Chart
          style={{ width: "600px" }}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={statdata}
          options={{
            hAxis: {
              title: "Date"
            },
            vAxis: {
              title: "Performance"
            },
            series: {
              1: { curveType: "function" }
            }
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </>
  );
}
