import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 401 kelganda loginga o'tish uchun
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Tokenni o‘chirib tashlash();
      sessionStorage.clear(); // Tokenni o‘chirib tashlash
      window.location.href = "#/cashiers"; // Loginga yo‘naltirish
    }
    return Promise.reject(error);
  }
);

export default api;
