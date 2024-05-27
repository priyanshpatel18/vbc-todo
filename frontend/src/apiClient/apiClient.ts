import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://vbc-todo-backend.vercel.app/api/v1`,
  withCredentials: true,
});

export default apiClient;
