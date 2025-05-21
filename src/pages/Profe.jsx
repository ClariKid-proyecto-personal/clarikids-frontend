import { useEffect, useState } from "react";
import { searchQuestions } from "../services/api";
import API from "../services/api";

function Profe() {
  const [questions, setQuestions] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  useEffect(() => {
    cargarPreguntas();
  }, []);

  const cargarPreguntas = async () => {
    try {
      const res = await API.get("/questions");
      const sinResponder = res.data.filter((q) => !q.answered);
      setQuestions(sinResponder);
    } catch (err) {
      console.error("Error al cargar preguntas", err);
    }
  };

  const enviarRespuesta = async () => {
    try {
      await API.post("/answers", {
        answerText: respuesta,
        question: {
          id: preguntaSeleccionada.id,
        },
      });
      setRespuesta("");
      setPreguntaSeleccionada(null);
      cargarPreguntas(); // Recarga la lista
    } catch (err) {
      console.error("Error al enviar respuesta", err);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Panel del profesorado 👩‍🏫</h2>

      {preguntaSeleccionada ? (
        <div style={{ marginTop: "2rem", backgroundColor: "#e0f7fa", padding: "1rem", borderRadius: "10px" }}>
          <h4>Pregunta:</h4>
          <p>{preguntaSeleccionada.questionText}</p>
          <textarea
            placeholder="Escribe tu respuesta..."
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            rows={4}
            style={{ width: "100%", marginTop: "1rem" }}
          />
          <br />
          <button onClick={enviarRespuesta} style={{ marginTop: "1rem" }}>
            Enviar respuesta
          </button>
          <button onClick={() => setPreguntaSeleccionada(null)} style={{ marginLeft: "1rem" }}>
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <h4>Preguntas sin responder:</h4>
          <ul>
            {questions.map((q) => (
              <li key={q.id} style={{ marginBottom: "1rem" }}>
                <strong>{q.subject}</strong>: {q.questionText}
                <br />
                <button onClick={() => setPreguntaSeleccionada(q)} style={{ marginTop: "0.5rem" }}>
                  Responder
                </button>
              </li>
            ))}
            {questions.length === 0 && <p>¡No hay preguntas pendientes! 🎉</p>}
          </ul>
        </>
      )}
    </main>
  );
}

export default Profe;
