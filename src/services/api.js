import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// Exporta las funciones individuales
export const searchQuestions = async (text, subject) => {
  try {
    const response = await api.get(`/questions/search`, {
      params: { text, subject },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar preguntas:", error);
    throw error;
  }
};

export default api;