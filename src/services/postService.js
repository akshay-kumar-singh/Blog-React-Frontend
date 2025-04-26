import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

const postApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

postApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createPost = async (title, content, coverImage) => {
  const response = await postApi.post("/", { title, content, coverImage });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await postApi.get("/");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await postApi.get(`/${id}`);
  return response.data;
};

export const getPostsByUser = async () => {
  const response = await postApi.get("/my-posts");
  return response.data;
};

export const deletePost = async (id) => {
  const response = await postApi.delete(`/${id}`);
  return response.data;
};

export const updatePost = async (id, updatedData) => {
  const response = await postApi.put(`/${id}`, updatedData);
  return response.data;
};
