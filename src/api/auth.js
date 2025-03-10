import api from "./api";

// Login qilish
export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Ro‘yxatdan o‘tish
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Logout qilish
export const logout = async () => {
  await api.post("/logout");
  // localStorage.removeItem("token");
};
