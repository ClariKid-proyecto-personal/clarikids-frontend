import { useState } from "react";
import { searchQuestions } from "../services/api";
import API from "../services/api";

function ChatForm({ onAnswer }) {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("matemáticas");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Buscar si hay una pregunta similar ya respondida
      const resultados = await searchQuestions(question, subject);
      console.log("🔍 Resultado del backend:", resultados);
  
      if (resultados.length > 0 && resultados[0].answerText) {
        onAnswer(resultados[0].answerText); // ✅ Mostrar la respuesta directamente
      } else {
        // Si no hay respuesta, guardar la pregunta como nueva
        await API.post("/questions", {
          questionText: question,
          subject: subject,
        });
  
        onAnswer("Aún no hay respuesta 😥");
      }
  
      setQuestion(""); // Limpiar input
    } catch (error) {
      console.error("Error al buscar o guardar pregunta:", error);
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
          <option value="matemáticas">Matemáticas</option>
          <option value="lengua">Lengua</option>
          <option value="ciencias sociales">Ciencias Sociales</option>
          <option value="ciencias naturales">Ciencias Naturales</option>
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