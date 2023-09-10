import axios from "../axios";

import { logoutUser, handleError } from "../controllers";

const verifyAccess = async () => {
  const { data: accessData } = await axios.get("/auth/verify-access");
  return accessData.message;
};

const handleLogout = async () => {
  logoutUser();
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("youtubeAccessToken");
  delete axios.defaults.headers.common["Authorization"];
  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
};

const renewToken = async ({ updateAlertBoxData }) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const body = {
      refreshToken: refreshToken,
    };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data: refreshTokenData } = await axios.post(
      "/auth/refresh-token",
      body,
      config
    );
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${refreshTokenData.newAccessToken}`;

    localStorage.setItem("accessToken", refreshTokenData.newAccessToken);
  } catch (error) {
    if (error?.response?.status === 403) {
      updateAlertBoxData({
        response: "Your session has expired!",
        isResponse: true,
        status: "error",
        timeout: 1500,
      });
      await handleLogout();
    } else {
      handleError(error, updateAlertBoxData);
    }
  }
};

export { verifyAccess, renewToken, handleLogout };
