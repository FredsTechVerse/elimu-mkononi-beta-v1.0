import axios from "axios";

const instance = axios.create({
  // baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
  // baseURL: "http://localhost:5000/elearning-module-a887d/us-central1/app",
  baseURL: "http://localhost:4000",
});

// Set up a request interceptor to include the access token in the headers
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
