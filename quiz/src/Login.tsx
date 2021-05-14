import { useReduce } from "./Reducer-context";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  let { dispatch, user } = useReduce();
  let [text, settext] = useState("");

  function inputhandler(event: React.ChangeEvent<HTMLInputElement>) {
    settext(event.target.value);
  }
  return (
    <>
      <h1>login</h1>
      <input onChange={inputhandler} />
      <Link to="questions">
        <button onClick={() => dispatch({ type: "USER", payload: text })}>
          Go
        </button>
      </Link>
    </>
  );
}
