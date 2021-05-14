import { useReduce } from "./Reducer-context";

type Headerprops = {
  username: string;
  score: number;
};
export function Header({ username, score }: Headerprops) {
  let {
    user,
    status,
    currentQsnNo,
    correct,
    wrong,
    data: { questions }
  } = useReduce();
  function totalscore() {
    return questions.reduce((total, item) => total + item.points, 0);
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
          <h2> No of Qsn Left -{questions.length - currentQsnNo}</h2>
        </>
      )}
    </>
  );
}
