import axios from "axios";

const API = axios.create({
  baseURL: "https://recharge-backend-2a71.onrender.com",
});

// Attach token automatically if exists
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export default API;
