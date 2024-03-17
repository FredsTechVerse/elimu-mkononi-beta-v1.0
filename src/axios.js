import axios from "axios";

const youtubeInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const serverInstance = axios.create({
  baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
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
