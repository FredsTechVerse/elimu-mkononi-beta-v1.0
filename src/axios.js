import axios from "axios";

const youtubeInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const serverInstance = axios.create({
  baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
  // baseURL: "http://localhost:5000/elearning-module-a887d/us-central1/app",
  // baseURL: "http://localhost:4000",
});

serverInstance.interceptors.request.use(
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

export { serverInstance as default, youtubeInstance };
