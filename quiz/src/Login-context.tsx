import React, { useContext, useState, createContext } from "react";
import { useReduce } from "./Reducer-context";
type Logincontextstate = {
  isUserLogin: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
const Logincontext = createContext({} as Logincontextstate);

export function Loginprovider({ children }: { children: any }) {
  let { dispatch } = useReduce();
  const [isUserLogin, setLogin] = useState(false);

  return (
    <>
      <Logincontext.Provider value={{ isUserLogin, setLogin }}>
        {children}
      </Logincontext.Provider>
    </>
  );
}
export function useLogin() {
  return useContext(Logincontext);
}
