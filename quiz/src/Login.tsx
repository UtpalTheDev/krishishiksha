import { useReduce } from "./Reducer-context";
import { useLogin } from "./Login-context";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Location } from "history";

import {Button,Box,Grid,TextField} from "@material-ui/core";


export function Login() {
  let { dispatch, user } = useReduce();
  let { isUserLogin, setLogin } = useLogin();

  let from = useLocation();
  let navigate = useNavigate();

  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  function navigationcall() {
    if (isUserLogin) {
      navigate("/home");
    }
  }
  useEffect(() => {
    navigationcall();
  });

  // navigationcall();

  function emailhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setemail(event.target.value);
  }
  function passwordhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setpassword(event.target.value);
  }

  type User = {
    _id: string;
    name: string;
    email: string;
  };
  type Servererror = {
    errormessage: string;
  };

  async function verify(): Promise<User | Servererror> {
    try {
      let response = await axios.post(
        "https://quiz-backend-demo-1.utpalpati.repl.co/user/infowithcred",
        { email: email, password: password }
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
  async function userassign() {
    let userdata = await verify();
    if ("name" in userdata) {
      localStorage.setItem(
        "user",
        JSON.stringify({ userid: userdata._id, login: true })
      );
      dispatch({ type: "USER", payload: userdata });
      setLogin((prev) => !prev);
    }
    console.log(userdata);
  }
  return (
    <>
      <Box>
        <h1>login</h1>
        <Grid container 
        direction="column"
        style={{marginBottom:"1rem"}}justify="center" alignItems="center" spacing={1}>
        <Grid item>    <TextField id="standard-basic" value={email}  label="Email Id" onChange={emailhandler}/></Grid>  
    
        <Grid item>
        <TextField
          label="Password"
          value={password}
          onChange={passwordhandler}
        /></Grid>
        <Grid item>
        <Button
        style={{marginTop:"1rem"}}
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            userassign();
          }}
        >
          Go
        </Button>
        </Grid>
        </Grid>



      </Box>
    </>
  );
}
