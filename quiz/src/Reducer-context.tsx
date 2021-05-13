import { createContext, Reducer, useContext, useReducer } from "react";

import { useState } from "react";
type statustype = "starting" | "finished" | "reset";

type quizstate = {
  score: number;
  status: statustype;
  currentQsnNo: number;
};
const initialstate: quizstate = {
  score: 0,
  status: "starting",
  currentQsnNo: 1
};
export const Reducercontext = createContext({} as any);

type actiontype =
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" };
function quizreducer(state: quizstate, action: actiontype): quizstate {
  switch (action.type) {
    case "RESET":
      return { ...state, score: 0, status: "starting", currentQsnNo: 1 };

    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + action.payload.score,
        currentQsnNo: state.currentQsnNo + 1
      };

    case "DECREMENT_SCORE":
      return {
        ...state,
        score: state.score - action.payload.score,
        currentQsnNo: state.currentQsnNo + 1
      };
    case "SKIP":
      console.log({
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo + 1
      });
      return {
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo + 1
      };
    default:
      return state;
  }
}

export function Contextprovider({ children }: { children: any }) {
  let [state, dispatch] = useReducer(quizreducer, initialstate);

  return (
    <Reducercontext.Provider value={{ state, dispatch }}>
      {children}
    </Reducercontext.Provider>
  );
}
export function useReduce() {
  return useContext(Reducercontext);
}
