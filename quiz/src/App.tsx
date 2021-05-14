import "./App.css";
import { quizOne } from "./Data/getQuiz";
import { Header } from "./Header";
import { Qsnblock } from "./Qsnblock";
import { useReduce } from "./Reducer-context";
import { Statistics } from "./Statistics";
import { Question } from "./Question";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";

export default function App() {
  console.log("render");
  console.log(useReduce());
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/questions" element={<Question />} />
      </Routes>
    </div>
  );
}
