import { Route, Navigate } from "react-router-dom";
import { useLogin } from "./Login-context";

export function Privateroute({ path, ...props }: any) {
  let { isUserLogin } = useLogin();

  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
