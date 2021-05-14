import { quizdata } from "./Data/getQuiz";
import { Link } from "react-router-dom";
import { useReduce } from "./Reducer-context";

export function Home() {
  let { dispatch } = useReduce();
  return (
    <>
      {Object.keys(quizdata).map((item) => {
        return (
          <>
            <Link
              key={item}
              to={`/${item}`}
              onClick={() => dispatch({ type: "CURRENTQUIZ", payload: item })}
            >
              <div style={{ background: "#f2f2f2" }}>{item}</div>
            </Link>
          </>
        );
      })}
    </>
  );
}
