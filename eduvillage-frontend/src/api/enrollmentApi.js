import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔑 Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getMyEnrollments = () => {
  return API.get("/enroll/my-courses");
};
