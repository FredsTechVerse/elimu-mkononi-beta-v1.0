import axios from "../axios";
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("youtubeAccessToken");
  delete axios.defaults.headers.common["Authorization"];
  window.location.reload();
};

export { handleLogout };
