import axios from "axios";
import api from "./api";


export async function login(username, password) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return response.json(); // debe devolver { token, role }
}