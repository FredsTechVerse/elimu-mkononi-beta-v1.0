import axios from "../axios";
import { logoutUser } from "../controllers/postData";
import { handleError } from "../controllers/handleErrors";
const handleLogout = async ({ updateAlertBoxData }) => {
  try {
    await logoutUser();
    // CLEAR STORAGE
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("youtubeAccessToken");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/";
  } catch (error) {
    handleError(error, updateAlertBoxData);
  }
};

export { handleLogout };
