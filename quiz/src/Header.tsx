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
      <h2>welcome-{user.name}</h2>
    <Grid container justify="space-between" alignItems="center">
      
      
      <h2>
        score-{score}/{totalscore()}
      </h2>
      {status !== "finished" && (
        <>
          <h2>
            {" "}
            No of Qsn Left -{data[currentquiz].questions.length - currentQsnNo}
          </h2>
        </>
      )}
    </Grid>
    <h2>{data[currentquiz].quizName}</h2>
    </Box>
  );
}
