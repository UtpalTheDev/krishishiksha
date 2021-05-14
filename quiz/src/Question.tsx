import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";

export function Question() {
  let { score, status, currentQsnNo, dispatch } = useReduce();

  return (
    <>
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
    </>
  );
}
