import { Route, Navigate } from "react-router-dom";
import { useLogin } from "./Login-context";

export function Privateroute({ path, ...props }: any) {
  let { isUserLogin } = useLogin();
console.log("login",isUserLogin)
  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={path} replace to="/login" />
  );
}
