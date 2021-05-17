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
export default function App() {
  console.log("render");
  console.log(useReduce());
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/learnincurve" element={<Learninggraph />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:quiztype" element={<Question />} />
      </Routes>
    </div>
  );
}
