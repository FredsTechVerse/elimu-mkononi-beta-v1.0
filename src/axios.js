//WE CREATE AN INSTANCE OF AXIOS AND EXPORT IT TO USE IT FROM NOW HENCEFORTH.
import axios from "axios";

const instance = axios.create({
  // baseURL: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app",
  // baseURL: "http://localhost:5000/elearning-module-a887d/us-central1/app",
  baseURL: "http://localhost:3000",
});
export default instance;
