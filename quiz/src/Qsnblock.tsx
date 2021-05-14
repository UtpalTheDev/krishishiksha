import { useEffect, useState } from "react";
import { quizdata } from "./Data/getQuiz";
import { useReduce } from "./Reducer-context";
import { Quizdata, quiz } from "./Data/quiz.types";
export function Qsnblock({ typedata }: { typedata: quiz }) {
  let { score, status, currentQsnNo, dispatch } = useReduce();
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
      <h5>{question}</h5>
      {time}
      <h6>Number of point- {points}</h6>
      {options.map((item, index) => {
        return (
          <>
            <button
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
            </button>
          </>
        );
      })}
    </>
  );
}
