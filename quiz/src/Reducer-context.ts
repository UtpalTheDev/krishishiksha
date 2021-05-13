import { createContext, useContext } from "react";

import { useState } from "react";
type statustype = "starting" | "finished" | "reset";

type quizstate = {
  score: number;
  status: statustype;
  currentQsnNo: number;
};
export const Reducercontext = createContext({} as quizstate);
