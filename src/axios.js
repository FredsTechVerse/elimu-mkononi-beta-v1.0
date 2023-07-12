import axios from "axios";

const accessToken = localStorage.getItem("accessToken") || "";

const instance = axios.create({
  // baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
  // baseURL: "http://localhost:5000/elearning-module-a887d/us-central1/app",
  baseURL: "http://localhost:4000",
  headers: {
    common: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  },
});

export default instance;
