import "./App.css";

import { useReduce } from "./reducer-context/Reducer-context";

// import { Question } from "./pages/Question";
 import { Routes, Route } from "react-router-dom";
// import { Login } from "./pages/Login";
// import { Home } from "./pages/Home";
 import { Privateroute } from "./Privateroute";
// import { Learninggraph } from "./pages/Learninggraph";
 //import { Navbar } from "./components/Navbar";
// import { User } from "./pages/User";
// import {Signup} from "./pages/Signup";
import {Question,Login,LearningGraph,Home,User,Signup } from "./pages"
import {Navbar} from "./components"
export default function App() {
  console.log("render");
  console.log(useReduce());
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Privateroute path="/learningcurve/:category" element={<LearningGraph />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Privateroute path="/user" element={<User />} />
        <Privateroute path="/:quiztype" element={<Question />} />
      </Routes>
    </div>
  );
}
