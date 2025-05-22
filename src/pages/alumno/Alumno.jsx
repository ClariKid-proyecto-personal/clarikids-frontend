import React, { useState } from "react";
import styles from "./Alumno.module.css";
import Robot from "../../components/Robot";

function Alumno() {
  const [subject, setSubject] = useState("matematicas");
  const [selectedSubject, setSelectedSubject] = useState("matematicas");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pregunta enviada:", question, "en", selectedSubject);
    
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
  
    try {
      const response = await fetch("http://localhost:8080/api/questions/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject,
          text: question,
        }),
      });
      
      if (!response.ok) {
        throw new Error("No autorizado. Revisa tu rol o token.");
      }
      
      const data = await response.json();
      setAnswer(data.answer || "Gracias, tu duda ha sido registrada.");
      setQuestion("");
    } catch (error) {
      console.error("Error al preguntar:", error);
      setAnswer("Ups... hubo un error 😢");
    }
  };

  return (
    <div className={styles.container}>
      <Robot />
  
      <div className={styles.content}>
        <h2 className={styles.title}>¿Cuál es tu pregunta?</h2>
  
        <div className={styles.subjects}>
  <button
    className={`${styles.subjectButton} ${styles.matematicas} ${subject === "matematicas" ? styles.selected : ""}`}
    onClick={() => setSubject("matematicas")}
  >
    ➕ Matemáticas
  </button>
  <button
    className={`${styles.subjectButton} ${styles.lengua} ${subject === "lengua" ? styles.selected : ""}`}
    onClick={() => setSubject("lengua")}
  >
    🧊 Lengua
  </button>
  <button
    className={`${styles.subjectButton} ${styles.sociales} ${subject === "sociales" ? styles.selected : ""}`}
    onClick={() => setSubject("sociales")}
  >
    🏛️ Sociales
  </button>
  <button
    className={`${styles.subjectButton} ${styles.naturales} ${subject === "naturales" ? styles.selected : ""}`}
    onClick={() => setSubject("naturales")}
  >
    🌼 Naturales
  </button>
</div>

<form onSubmit={handleAsk} className={styles.form}>
  <input
    type="text"
    placeholder="Escribe tu pregunta aquí..."
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    className={styles.input}
  />
  <button type="submit">Enviar / Preguntar</button>
</form>

{answer && <div className={styles.answer}>{answer}</div>}
      </div>
    </div>
  );
}

export default Alumno;