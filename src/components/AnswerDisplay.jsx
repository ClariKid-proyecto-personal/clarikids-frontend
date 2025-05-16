function AnswerDisplay({ answer }) {
    return (
      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f3f3f3", borderRadius: "10px" }}>
        <h3>Respuesta del profe:</h3>
        <p>{answer}</p>
      </div>
    );
  }
  
  export default AnswerDisplay;
  