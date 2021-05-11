import { useReducer, useState } from "react";
import "./App.css"
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
type Memo = string | number;
let memo: Memo = 55;
function printmemo(memo: Memo) {
  if (typeof memo === "string") {
    return memo + "ll";
  }
  return memo + 5;
}

type quizstate = {
  score: number;
  status: statustype;
};
const initialstate: quizstate = { score: 0, status: "starting" };


type actiontype =
  | { type: "RESET" }
  | { type: "INCREMENT"; payload: { score: number } };

function quizreducer(state: typeof initialstate, action: actiontype) {
  switch (action.type) {
    case "RESET":
      return { ...state };

    case "INCREMENT":
      return { ...state, score: action.payload.score };

    default:
      return state;
  }
}

export default function App() {
  let [score, setscore] = useState(0);
  let [currentqsnno, setcurrentqsnno] = useState(1);
  const [status, setstatus] = useState<statustype>("starting");
  let [state, dispatch] = useReducer(quizreducer, initialstate);
  return (
    <div className="App">
      <Header username={"jdk"} score={score} />
      <h4>current qsn no-{currentqsnno}</h4>
      {status}
      <br />

      {printmemo(memo)}
      <br />
      {quizOne.questions.map(item => {
        return (<>
          <h5>{item.question}</h5>
          {item.options.map((item1, index) => {
            return (
              <>
                <button
                  onClick={() => {
                    if (item1.isRight === true) { setscore((prev) => prev + 1); }
                    else {
                      setscore((prev) => prev - 1)
                    }

                    setcurrentqsnno((prev) => prev + 1);
                  }}
                >
                  {`${index}. ${item1.text}`}
                </button>

                <br />
              </>
            )
          })}
        </>)
      })}
      <br />

      <button
        onClick={() => {
          setscore((prev) => prev - 1);
          setcurrentqsnno((prev) => prev + 1);
        }}
      >
        no
      </button>
      <button
        onClick={() => {
          setscore(0);
          setcurrentqsnno(1);
        }}
      >
        reset
      </button>
    </div>
  );
}
