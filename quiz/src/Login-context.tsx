import React, { useContext, useState, createContext, useEffect } from "react";
import { useReduce } from "./Reducer-context";
import axios, { AxiosError } from "axios";
type Logincontextstate = {
  isUserLogin: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
const Logincontext = createContext({} as Logincontextstate);

export function Loginprovider({ children }: { children: any }) {
  let { dispatch } = useReduce();
  const [isUserLogin, setLogin] = useState(false);

  type Servererror = {
    errormessage: string;
  };
  type User = {
    _id: string;
    name: string;
    email: string;
  };
  async function verify(id: string): Promise<User | Servererror> {
    try {
      let response = await axios.post(
        "https://quiz-backend-demo-1.utpalpati.repl.co/user/infowithtoken",
        { userid: id }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let servererror = error as AxiosError<Servererror>;
        if (servererror && servererror.response) {
          return servererror.response.data;
        }
      }
      return { errormessage: "something wrong" };
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const localgetdata = localStorage?.getItem("user");
        const localparsedata =
          localgetdata !== null ? JSON.parse(localgetdata) : {};
        console.log("parsedata success", localparsedata);

        if ("login" in localparsedata) {
          let userdata = await verify(localparsedata.userid);
          if ("name" in userdata) {
            console.log("parsedata success");

            dispatch({ type: "USER", payload: userdata });
            setLogin(true);
          }
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.log("locastorage error", error);
      }
    })();
  }, []);

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
