import { useReduce } from "./Reducer-context";
import {Box} from "@material-ui/core"
export function Statistics() {
  let { correct, wrong} = useReduce();
  return (
    <><Box textAlign="center">
      <p> Attempted- {correct + wrong}</p>
      <p> Correct ans- {correct}</p>
      <p> Wrong ans- {wrong}</p>
    </Box>
    </>

  );
}
