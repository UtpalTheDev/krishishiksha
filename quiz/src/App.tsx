import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { quizOne } from "./Data/getQuiz";

type Headerprops = {
  username: string;
  score: number;
};

function Header({ username, score }: Headerprops) {
  return (
    <>
      <h1>Quiz</h1>
      <h2>welcome-{username}</h2>
      <h2>score-{score}</h2>
    </>
  );
}
type statustype = "starting" | "finished" | "reset";

type quizstate = {
  score: number;
  status: statustype;
  currentQsnNo: number;
};
const initialstate: quizstate = {
  score: 0,
  status: "starting",
  currentQsnNo: 1
};

type actiontype =
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" };

function quizreducer(state: quizstate, action: actiontype): quizstate {
  switch (action.type) {
    case "RESET":
      return { ...state, score: 0, status: "starting", currentQsnNo: 1 };

    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + action.payload.score,
        currentQsnNo: state.currentQsnNo + 1
      };

    case "DECREMENT_SCORE":
      return {
        ...state,
        score: state.score - action.payload.score,
        currentQsnNo: state.currentQsnNo + 1
      };
    case "SKIP":
      console.log({
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo + 1
      });
      return {
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo + 1
      };
    default:
      return state;
  }
}
console.log("lpop");

function Qsnblock({ state, dispatch }: { state: quizstate; dispatch: any }) {
  const [time, settime] = useState(15);
  console.log("qsnblock");
  useEffect(() => {
    console.log("effect");
    let timer = setInterval(() => {
      settime((prev) => prev - 1);
    }, 1000);
    console.log("time", time);
    if (time === 0) {
      dispatch({ type: "SKIP" });
      settime(15);
    }
    return () => {
      console.log("neweffect");
      clearInterval(timer);
    };
  }, [dispatch, time]);

  console.log("qsnb", state.currentQsnNo - 1);
  let { question, options, points } = quizOne.questions[state.currentQsnNo - 1];
  return (
    <>
      <h5>{question}</h5>
      {time}
      <h6>Number of point- {points}</h6>
      {options.map((item, index) => {
        return (
          <>
            <button
              onClick={() => {
                if (item.isRight === true) {
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
            </button>
          </>
        );
      })}
    </>
  );
}
export default function App() {
  console.log("render");
  let [state, dispatch] = useReducer(quizreducer, initialstate);

  //console.log("render");
  return (
    <div className="App">
      <Header username={"jdk"} score={state.score} />
      {state.currentQsnNo <= quizOne.questions.length && (
        <h4>Qsn No- {state.currentQsnNo}</h4>
      )}
      {state.status}
      <br />

      {state.currentQsnNo <= quizOne.questions.length ? (
        <Qsnblock state={state} dispatch={dispatch} />
      ) : (
        "thank you"
      )}

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
