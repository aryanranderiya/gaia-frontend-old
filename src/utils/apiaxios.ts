import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

axios.defaults.timeout = 300_000;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const instanceauth = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const apiauth = setupCache(instanceauth);
export const api = setupCache(instance);

export default api;
