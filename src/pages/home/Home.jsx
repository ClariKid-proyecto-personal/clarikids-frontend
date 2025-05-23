import { useState } from "react";
import styles from "./Home.module.css";
import { login } from "../../services/authService";


function Home() {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const abrirModalAlumno = () => setModalAbierto("alumno");
  const abrirModalProfesor = () => setModalAbierto("profe");
  const cerrarModal = () => setModalAbierto(null);

  const manejarLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await login(username, password);
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);

    if (response.role === "PROFESOR") {
      window.location.href = "/profe";
    } else {
      window.location.href = "/alumno";
    }
  } catch (err) {
    setError("Usuario o contraseña incorrectos");
  }
};

  return (
    <div className={styles.container}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.chewyTitle}>Clarikids</h1>
          </div>
        <div className={styles.overlay}>
        <h2 className={styles.title}>¿Quién eres?</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.alumnoButton} onClick={abrirModalAlumno}>
          🤖 Soy alumno
          </button>
          <button className={styles.profeButton} onClick={abrirModalProfesor}>
          📘 Soy profesor
          </button>
        </div>

        {modalAbierto && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button className={styles.cerrar} onClick={cerrarModal}>✖</button>
              <h3>Inicia sesión como {modalAbierto}</h3>
              <form onSubmit={manejarLogin} className={styles.form}>
                <input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
                {error && <p className={styles.error}>{error}</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;