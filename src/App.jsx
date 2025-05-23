import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home/Home.jsx";
import Profe from "./pages/profe/Profe.jsx";
import Alumno from "./pages/alumno/Alumno.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [answer, setAnswer] = useState("");

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route
          path="/alumno"
          element={
            <ProtectedRoute>
              <Alumno /> {}
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




