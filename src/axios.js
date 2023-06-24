import axios from "axios";

const accessToken = localStorage.getItem("accessToken") || "";
console.log(`Setting access token to ${accessToken}`);
const instance = axios.create({
  baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
  // baseURL: "http://localhost:5000/elearning-module-a887d/us-central1/app",
  // baseURL: "http://localhost:3000",
  headers: {
    common: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  },
});

export default instance;
