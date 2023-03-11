import axios from "axios";

const instance = axios.create({
  timeout: 1000,
  baseURL: "http://localhost:8000",
});

export default instance;
