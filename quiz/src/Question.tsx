import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";
import { useParams } from "react-router-dom";

import { quizdata } from "./Data/getQuiz";
import { useEffect } from "react";
export function Question() {
  let { quiztype } = useParams();
  // let {data}=useReduce();

  console.log("jkh", quizdata[quiztype]);
  let { score, status, currentQsnNo, dispatch, data } = useReduce();

  useEffect(() => {
    dispatch({ type: "CURRENTQUIZ", payload: quiztype });
    dispatch({ type: "RESET" });
  }, []);
  return (
    <>
      <Header />
      {status !== "finished" && <h4>Qsn No- {currentQsnNo}</h4>}
      {status}
      <br />

      {status !== "finished" ? (
        <Qsnblock typedata={data[quiztype]} />
      ) : (
        <Statistics />
      )}
      <br />
      <button
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        reset
      </button>
    </>
  );
}
