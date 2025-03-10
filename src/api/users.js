import api from "./api";

// Barcha userlarni olish
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Bitta userni olish
export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// User ma'lumotlarini yangilash
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};
