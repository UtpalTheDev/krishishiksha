import { useReduce } from "./Reducer-context";
import { useLogin } from "./Login-context";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <div>
        <Link to="/user">user</Link>
      </div>
    </>
  );
}
