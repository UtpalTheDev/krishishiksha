import { useReduce } from "./Reducer-context";
import { quiz } from "./Data/quiz.types";
import {Button,Box,Grid} from "@material-ui/core";

export function Header() {
  let { user, score, status, currentQsnNo, currentquiz, data } = useReduce();
  function totalscore() {
    return data[currentquiz].questions.reduce(
      (total, item) => total + item.points,
      0
    );
  }

  return (
    <Box textAlign="center">
      <h3>welcome-{user.name}</h3>
    <Grid container justify="space-between" alignItems="center">
      
      
      <div>
        score- ({score}/{totalscore()})
      </div>
      {status !== "finished" && (
        <>
          <div>
            {" "}
            No of Qsn Left -{data[currentquiz].questions.length - currentQsnNo}
          </div>
        </>
      )}
    </Grid>
    <h3>{data[currentquiz].quizName}</h3>
    </Box>
  );
}
