import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const signupUser = async (name, email, password) => {
  return api.post("/signup", { name, email, password });
};

export const loginUser = async (email, password) => {
  const response = await api.post("/login", { email, password });
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return response;
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
