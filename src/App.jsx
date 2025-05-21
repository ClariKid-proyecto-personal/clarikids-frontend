import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Profe from "./pages/Profe";
import Robot from "./components/Robot";
import ChatForm from "./components/ChatForm";
import AnswerDisplay from "./components/AnswerDisplay";


function App() {
  const [answer, setAnswer] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route
            path="/alumno"
            element={
              <main style={{ position: "relative", minHeight: "100vh", padding: "2rem" }}>
                <Robot />
                <h2>¡Hola Clarikid! 👧🤖</h2>
                <ChatForm onAnswer={setAnswer} />
                {answer && <AnswerDisplay answer={answer} />}
              </main>
            }
          />
       <Route path="/profe" element={<Profe />} />
      </Routes>
    </Router>
  );
}

export default App;








