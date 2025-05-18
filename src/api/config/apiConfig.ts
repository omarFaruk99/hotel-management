import axios from "axios";

// get base url from env variable
export const API_BASE_URL = process.env.REACT_APP_BASE_URL

// Get token from environment variables
export const getToken = () => {
  return process.env.REACT_APP_API_TOKEN;
};

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    } else {
      console.error("No API token found in environment variables");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
