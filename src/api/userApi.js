import API from "../config/api";

export const loginUser = (formData) =>
  API.post("/api/users/login", formData);

export const registerUser = (formData) =>
  API.post("/api/users/register", formData);
