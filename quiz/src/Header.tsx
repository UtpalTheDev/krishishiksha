import { useReduce } from "./Reducer-context";

type Headerprops = {
  username: string;
  score: number;
};
export function Header({ username, score }: Headerprops) {
  let {
    status,
    currentQsnNo,
    correct,
    wrong,
    data: { questions }
  } = useReduce();

  return (
    <>
      <h1>Quiz</h1>
      <h2>welcome-{username}</h2>
      <h2>score-{score}</h2>
      {status !== "finished" && (
        <>
          <h2> No of Qsn Left -{questions.length - currentQsnNo}</h2>
        </>
      )}
    </>
  );
}
