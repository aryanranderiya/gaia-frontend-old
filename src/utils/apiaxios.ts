import axios from "axios";
axios.defaults.timeout = 300000;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const apiauth = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default api;
