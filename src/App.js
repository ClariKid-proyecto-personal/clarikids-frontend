import { useState } from "react";
import ChatForm from "./components/ChatForm";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
  const [answer, setAnswer] = useState("");

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#ff69b4" }}>Bienvenido a Clarikids 🧠✨</h1>
      <p>Escribe tu duda y veremos si el profe ya tiene una respuesta para ti 💬</p>
      <ChatForm onAnswer={setAnswer} />
      {answer && <AnswerDisplay answer={answer} />}
    </main>
  );
}

export default App;
