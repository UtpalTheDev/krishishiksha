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
export default function App() {
  console.log("render");
  // let [score, setscore] = useState(0);
  // let [currentqsnno, setcurrentqsnno] = useState(1);
  // const [status, setstatus] = useState<statustype>("starting");
  const [time, settime] = useState(15);
  //let time = 1000;
  let [state, dispatch] = useReducer(quizreducer, initialstate);
  //console.log("log", quizOne.questions[state.currentQsnNo - 1]);
  console.log(state.currentQsnNo, time);

  useEffect(() => {
    settime(15);
    let timer = setInterval(() => {
      settime((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          console.log("end");
        }
        return prev - 1;
      });
    }, 1000);
    let timer1 = setTimeout(() => {
      dispatch({ type: "SKIP" });
    }, 15000);
    return () => {
      console.log("neweffect");
      clearInterval(timer);
      clearTimeout(timer1);
    };
  }, [state.currentQsnNo]);
  function Qsnblock() {
    console.log("qsnb", state.currentQsnNo - 1);
    let { question, options, points } = quizOne.questions[
      state.currentQsnNo - 1
    ];
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
                  } else {
                    dispatch({
                      type: "INCREMENT_SCORE",
                      payload: { score: points }
                    });
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

  return (
    <div className="App">
      <Header username={"jdk"} score={state.score} />
      <h4>current qsn no-{state.currentQsnNo}</h4>
      {state.status}
      <br />

      {state.currentQsnNo <= quizOne.questions.length ? (
        <Qsnblock />
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
