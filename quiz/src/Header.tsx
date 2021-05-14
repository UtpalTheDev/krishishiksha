import { useReduce } from "./Reducer-context";
import { quiz } from "./Data/quiz.types";

export function Header() {
  let {
    user,
    score,
    status,
    currentQsnNo,
    currentquiz,
    correct,
    wrong,
    data
  } = useReduce();
  function totalscore() {
    return data[currentquiz].questions.reduce(
      (total, item) => total + item.points,
      0
    );
  }

  return (
    <>
      <h1>Quiz</h1>
      <h2>welcome-{user}</h2>
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
    </>
  );
}
