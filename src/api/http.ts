import axios from "axios";

const instance = axios.create({
  timeout: 1000 * 60,
  baseURL: "http://139.9.84.138:8000",
});

export default instance;
