import { useReducer } from "react";
import "./App.css";
import { quizOne } from "./Data/getQuiz";
import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";

export default function App() {
  console.log("render");
  let { score, status, currentQsnNo, dispatch } = useReduce();
  console.log(useReduce());
  return (
    <div className="App">
      <Header username={"jdk"} score={score} />
      {status !== "finished" && <h4>Qsn No- {currentQsnNo}</h4>}
      {status}
      <br />

      {status !== "finished" ? <Qsnblock /> : <Statistics />}
      <br />
      <button
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        reset
      </button>
    </div>
  );
}
