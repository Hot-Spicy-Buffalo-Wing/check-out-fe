import axios from "axios";

const api = axios.create({
  baseURL: "/local",
});

export default api;
