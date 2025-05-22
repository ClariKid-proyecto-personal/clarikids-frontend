import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home/Home.jsx";
import Profe from "./pages/Profe";
import Robot from "./components/Robot";
import ChatForm from "./components/ChatForm";
import AnswerDisplay from "./components/AnswerDisplay";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [answer, setAnswer] = useState("");

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route
          path="/alumno"
          element={
            <ProtectedRoute>
              <main style={{ position: "relative", minHeight: "100vh", padding: "2rem" }}>
                <Robot />
                <h2>¡Hola Clarikid! 👧🤖</h2>
                <ChatForm onAnswer={setAnswer} />
                {answer && <AnswerDisplay answer={answer} />}
              </main>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profe"
          element={
            <ProtectedRoute>
              <Profe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




