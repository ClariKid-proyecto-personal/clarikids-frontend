import { useState } from "react";
import API from "../services/api";

function ChatForm({ onAnswer }) {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("mates");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Enviar la pregunta con su asignatura
      const res = await API.post("/questions", {
        questionText: question,
        subject: subject,
      });

      // 2. Buscar si hay respuesta parecida
      const answers = await API.get("/answers");
      const matching = answers.data.find((ans) =>
        res.data.questionText
          .toLowerCase()
          .includes(ans.question.questionText.toLowerCase())
      );

      if (matching) {
        onAnswer(matching.answerText);
      } else {
        onAnswer("Aún no hay respuesta 😥");
      }

      setQuestion("");
    } catch (error) {
      console.error("Error al enviar pregunta:", error);
      onAnswer("Hubo un error 😖");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <label>
        Asignatura:{" "}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: "0.5rem" }}
        >
          <option value="mates">Matemáticas</option>
          <option value="lengua">Lengua</option>
          <option value="ciencias">Ciencias</option>
          <option value="sociales">Sociales</option>
        </select>
      </label>
      <br />
      <input
        type="text"
        placeholder="Escribe tu duda..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <button type="submit">Preguntar</button>
    </form>
  );
}

export default ChatForm;
