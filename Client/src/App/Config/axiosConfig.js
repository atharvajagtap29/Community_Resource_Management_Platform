import axios from "axios";

// Create an axios instance with default settings
const axiosInstance = axios.create({
  // Set the base URL for all requests
  baseURL: import.meta.env.VITE_BACKEND_APIs_ENDPOINT,
  // Set the default headers for all requests
  headers: {
    "Content-Type": "application/json",
  },
  // Pass cookies with each request
  withCredentials: true,
});

export default axiosInstance;
