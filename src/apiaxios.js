import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "https://gaia-api.aryanranderiya.com/",
});

export default api;
