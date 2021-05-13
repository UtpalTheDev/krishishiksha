import React, { createContext, useContext, useReducer } from "react";

import { quizOne } from "./Data/getQuiz";
import { quiz } from "./Data/quiz.types";
import { useState } from "react";
type statustype = "starting" | "finished" | "Running";

type quizstate = {
  score: number;
  status: statustype;
  currentQsnNo: number;
  correct: number;
  wrong: number;
  data: quiz;
};
const initialstate: quizstate = {
  score: 0,
  status: "starting",
  currentQsnNo: 1,

  correct: 0,
  wrong: 0,
  data: quizOne
};
type actiontype =
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" }
  | { type: "CORRECT" }
  | { type: "WRONG" };

type Contextstate = {
  score: number;
  status: statustype;
  currentQsnNo: number;

  correct: number;
  wrong: number;
  data: quiz;
  dispatch: React.Dispatch<actiontype>;
};

export const Reducercontext = createContext({} as Contextstate);

function quizreducer(state: quizstate, action: actiontype): quizstate {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        score: 0,
        status: "starting",
        currentQsnNo: 1,
        correct: 0,
        wrong: 0
      };

    case "INCREMENT_SCORE":
      if (state.currentQsnNo + 1 <= state.data.questions.length) {
        return {
          ...state,
          score: state.score + action.payload.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running",
          correct: state.correct + 1
        };
      }
      return {
        ...state,
        score: state.score + action.payload.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished",
        correct: state.correct + 1
      };

    case "DECREMENT_SCORE":
      if (state.currentQsnNo + 1 <= state.data.questions.length) {
        return {
          ...state,
          score: state.score - action.payload.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running",
          wrong: state.wrong + 1
        };
      }
      return {
        ...state,
        score: state.score - action.payload.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished",
        wrong: state.wrong + 1
      };
    case "SKIP":
      if (state.currentQsnNo + 1 <= state.data.questions.length)
        return {
          ...state,
          score: state.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running"
        };
      return {
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished"
      };
    default:
      return state;
  }
}

export function Contextprovider({ children }: { children: any }) {
  let [
    { score, status, currentQsnNo, correct, wrong, data },
    dispatch
  ] = useReducer(quizreducer, initialstate);

  return (
    <Reducercontext.Provider
      value={{
        score,
        status,
        currentQsnNo,

        correct,
        wrong,
        data,
        dispatch
      }}
    >
      {children}
    </Reducercontext.Provider>
  );
}
export function useReduce() {
  return useContext(Reducercontext);
}
