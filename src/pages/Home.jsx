import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchQuestions } from "../services/api";

function Home() {
  const [userInput, setUserInput] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("mates");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await searchQuestions(userInput, selectedSubject);
      if (result.length > 0) {
        setAnswer(result[0].questionText); // muestra la pregunta relacionada
      } else {
        setAnswer("No encontré ninguna respuesta, ¡pero puedes intentarlo de nuevo! 🧐");
      }
    } catch (error) {
      setAnswer("Error al buscar, prueba más tarde 😞");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#fff0f5",
        height: "100vh",
      }}
    >
      <h1>¡Bienvenid@ a Clarikids! 🤖✨</h1>
      <p>¿Cómo quieres entrar?</p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "12px",
            backgroundColor: "#ff69b4",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => navigate("/alumno")}
        >
          Soy niñ@
        </button>

        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "12px",
            backgroundColor: "#00bcd4",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => navigate("/profe")}
        >
          Soy profe
        </button>
      </div>

      {/* Chat rápido en la misma vista */}
      <form onSubmit={handleSubmit} style={{ marginTop: "3rem" }}>
        <label>
          Asignatura:{" "}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="mates">Matemáticas</option>
            <option value="ciencias">Ciencias</option>
            <option value="lengua">Lengua</option>
          </select>
        </label>
        <br />
        <input
          type="text"
          placeholder="Escribe tu duda..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ marginRight: "10px", padding: "0.5rem" }}
        />
        <button type="submit">Preguntar</button>
      </form>

      {answer && (
        <div
          style={{
            backgroundColor: "#eee",
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "10px",
            width: "70%",
            marginInline: "auto",
          }}
        >
          <strong>Respuesta del profe:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Home;