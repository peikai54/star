import axios from "axios";

const instance = axios.create({
  timeout: 1000 * 60,
  baseURL: "http://localhost:8000",
});

export default instance;
