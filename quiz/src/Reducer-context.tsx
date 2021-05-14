import React, { createContext, useContext, useReducer } from "react";

import { quizdata } from "./Data/getQuiz";
import { Quizdata } from "./Data/quiz.types";
import { useState } from "react";
type statustype = "starting" | "finished" | "Running";

type quizstate = {
  user: string;
  score: number;
  status: statustype;
  currentQsnNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  data: Quizdata;
};
const initialstate: quizstate = {
  user: "",
  score: 0,
  status: "starting",
  currentQsnNo: 1,
  currentquiz: "",
  correct: 0,
  wrong: 0,
  data: quizdata
};
type actiontype =
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" }
  | { type: "USER"; payload: string }
  | { type: "CURRENTQUIZ"; payload: string };
type Contextstate = {
  user: string;
  score: number;
  status: statustype;
  currentQsnNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  data: Quizdata;
  dispatch: React.Dispatch<actiontype>;
};

export const Reducercontext = createContext({} as Contextstate);

function quizreducer(state: quizstate, action: actiontype): quizstate {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "CURRENTQUIZ":
      return { ...state, currentquiz: action.payload };
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
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      ) {
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
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      ) {
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
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      )
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
    { user, score, currentquiz, status, currentQsnNo, correct, wrong, data },
    dispatch
  ] = useReducer(quizreducer, initialstate);

  return (
    <Reducercontext.Provider
      value={{
        score,
        status,
        currentQsnNo,
        currentquiz,
        user,
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
