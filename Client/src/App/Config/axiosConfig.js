import axios from "axios";
import { useAuth } from "../Context/AuthContext";

// Create an axios instance with default settings
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_APIs_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
