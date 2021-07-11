import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Privateroute } from "./Privateroute";
import {Question,Login,LearningGraph,Home,User,Signup } from "./pages"
import {Navbar} from "./components"
export default function App() {
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
