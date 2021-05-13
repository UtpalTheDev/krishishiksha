import { useReduce } from "./Reducer-context";

export function Statistics() {
  let { correct, wrong, data } = useReduce();
  return (
    <>
      <p> Attempted- {correct + wrong}</p>
      <p> Correct ans- {correct}</p>
      <p> Wrong ans- {wrong}</p>
    </>
  );
}
