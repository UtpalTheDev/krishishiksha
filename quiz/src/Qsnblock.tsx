import { useEffect, useState } from "react";
import { quizdata } from "./Data/getQuiz";
import { useReduce } from "./Reducer-context";
import { Quizdata, quiz } from "./Data/quiz.types";
import axios from "axios";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Button, Box, Grid } from "@material-ui/core";

export function Qsnblock({ typedata }: { typedata: quiz }) {
  let { score, status, currentQsnNo, dispatch, user } = useReduce();
  const [time, settime] = useState(15);
  const totaltime=15
  useEffect(() => {
    let timer = setInterval(() => {
      settime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      dispatch({ type: "SKIP" });
      settime(15);
    }
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, time]);

  let { question, options, points } = typedata.questions[currentQsnNo - 1];

  return (
    <>
      <Box textAlign="center" style={{width:"100%"}}>
        <h2>{question}</h2>
        
        <CircularProgressWithLabel value={(time/totaltime)*100} total={totaltime} />
        <h6>Number of point- {points}</h6>
        <Grid container spacing={3} justify="center" style={{width:"100%"}}>
          {options.map((item, index) => {
            return (
              
                <Grid item xs={10} sm={5} md={4} lg={3}>
                  <Button
                    variant="outlined"
                    style={{width:"100%",height:"100%"}}
                    color="primary"
                    onClick={() => {
                      if (item.isRight === false) {
                        dispatch({
                          type: "DECREMENT_SCORE",
                          payload: { score: points }
                        });
                        settime(15);
                      } else {
                        dispatch({
                          type: "INCREMENT_SCORE",
                          payload: { score: points }
                        });
                        settime(15);
                      }
                    }}
                  >
                    {` ${item.text}`}
                  </Button>
                </Grid>
              
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
