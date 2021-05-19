import { useEffect, useState } from "react";
import { quizdata } from "./Data/getQuiz";
import { useReduce } from "./Reducer-context";
import { Quizdata, quiz } from "./Data/quiz.types";
import axios from "axios";

import { Button, Box, Grid } from "@material-ui/core";

export function Qsnblock({ typedata }: { typedata: quiz }) {
  let { score, status, currentQsnNo, dispatch, user } = useReduce();
  const [time, settime] = useState(15);

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
      <Box>
        <h5>{question}</h5>
        {time}
        <h6>Number of point- {points}</h6>
        <Grid container spacing={3} justify="center">
          {options.map((item, index) => {
            return (
              <>
                <Grid item sm={12}>
                  <Button
                    variant="outlined"
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
                    {`${index}. ${item.text}`}
                  </Button>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
