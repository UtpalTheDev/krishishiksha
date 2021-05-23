import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";
import { useParams } from "react-router-dom";
import axios from "axios";
import { quizdata } from "./Data/getQuiz";
import { useEffect } from "react";
import {Answer} from "./Answer";
import {Button,Box,Grid} from "@material-ui/core";

export function Question() {
  let { quiztype } = useParams();

  // let {data}=useReduce();

  console.log("jkh", quizdata[quiztype]);
  let {
    score,
    status,
    currentQsnNo,
    currentquiz,
    dispatch,
    data,
    user,
    correct,
    wrong
  } = useReduce();

  useEffect(() => {
    console.log("1st effect");
    dispatch({ type: "CURRENTQUIZ", payload: quiztype });
    dispatch({ type: "RESET" });
  }, []);

  function totalscore() {
    return data[currentquiz].questions.reduce(
      (total, item) => total + item.points,
      0
    );
  }

  useEffect(() => {
    console.log("2nd effect", totalscore());
    (async function () {
      if (status === "finished") {
        try {
          let response = await axios.post(
            "https://quiz-backend-demo-1.utpalpati.repl.co/data/save",
            {
              userid: user._id,
              quizdata: {
                category: quiztype,
                score,
                correct,
                wrong,
                no_of_question: currentQsnNo,
                totalscore: totalscore(),
                Date: new Date()
              }
            }
          );
          console.log("response", response);
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [status]);
  return (
    <>
      <Box>
        <Header />
        {status !== "finished" && <h4>Qsn No- {currentQsnNo}</h4>}
        
        <br />

        {status !== "finished" ? (
          <Qsnblock typedata={data[quiztype]} />
        ) : (
          <Statistics />
        )}
       
        {status==="finished" &&<Answer typedata={data[quiztype]}/>}
      </Box>
    </>
  );
}
