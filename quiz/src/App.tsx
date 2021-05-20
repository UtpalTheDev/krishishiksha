import "./App.css";
import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";
import { Question } from "./Question";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { Privateroute } from "./Privateroute";
import { Learninggraph } from "./Learninggraph";
import { Navbar } from "./Navbar";
import { User } from "./User";
import {Signup} from "./Signup";
export default function App() {
  console.log("render");
  console.log(useReduce());
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Privateroute path="/learningcurve/:category" element={<Learninggraph />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Privateroute path="/user" element={<User />} />
        <Privateroute path="/:quiztype" element={<Question />} />
      </Routes>
    </div>
  );
}
