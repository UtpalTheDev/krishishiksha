import React, { createContext, useContext, useReducer,useEffect,FunctionComponent} from "react";
import axios from"axios";
import { quizdata } from "./Data/getQuiz";
import { Quizdata } from "./Data/quiz.types";
import { JsxElement } from "typescript";

type statustype = "starting" | "finished" | "Running";
type UserState = {
  _id: string;
  name: string;
  email: string;
};

type quizstate = {
  user: UserState;
  score: number;
  status: statustype;
  currentQsnNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  data: Quizdata;
  categorydata: string[];
};
const initialstate: quizstate = {
  user: { _id: "", name: "", email: "" },
  score: 0,
  status: "starting",
  currentQsnNo: 1,
  currentquiz: "",
  correct: 0,
  wrong: 0,
  data: {},
  categorydata: Object.keys(quizdata)
};
type actiontype =
  | {type:  "LOAD"; payload:{data:Quizdata} }
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" }
  | { type: "USER"; payload: UserState }
  | { type: "CURRENTQUIZ"; payload: string }
  | {type: "LOGOUT"}
type Contextstate = {
  user: UserState;
  score: number;
  status: statustype;
  currentQsnNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  data: Quizdata;
  categorydata: string[];
  dispatch: React.Dispatch<actiontype>;
};

export const Reducercontext = createContext({} as Contextstate);

function quizreducer(state: quizstate, action: actiontype): quizstate {
  console.log("reducer");
  switch (action.type) {
    case "LOAD": 
      return{...state, data:action.payload.data}
    
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
    case "LOGOUT":
      return{
        ...state,
        user:{_id:"",name:"",email:""},
        score: 0,
        status: "starting",
        currentQsnNo: 1,
        currentquiz: "",
        correct: 0,
        wrong: 0,
        data: quizdata,
        categorydata: Object.keys(quizdata)
      }
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

export function Contextprovider({ children }:{children:React.ReactChild}) {

  useEffect(()=>{
    (async()=>{
      const response=await axios.get("https://quiz-backend-demo-1.utpalpati.repl.co/question/");
      if(response.status===200){
        dispatch({type:"LOAD",payload:{data:response.data}})
      }
    })()
    
  },[])
  console.log("reduce context")
  let [
    {
      user,
      score,
      currentquiz,
      status,
      currentQsnNo,
      correct,
      wrong,
      data,
      categorydata
    },
    dispatch
  ] = useReducer(quizreducer, initialstate);
  // console.log("kljj",categorydata)
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
        categorydata,
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
