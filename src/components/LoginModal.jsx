import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginModal({ role, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      //localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      onClose();

      if (response.role === "PROFESOR") {
        navigate("/profe");
      } else {
        navigate("/alumno");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Inicia sesión ({role})</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
            Entrar
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <button onClick={onClose} className="mt-3 text-sm text-gray-500">Cerrar</button>
      </div>
    </div>
  );
}

export default LoginModal;