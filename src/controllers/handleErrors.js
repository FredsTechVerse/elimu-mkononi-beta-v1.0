import axios from "../axios";

const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "The resource / user does not exist",
  DUPLICATION_ERROR: "This document already exists!",
  INVALID_TOKEN: "Your token is invalid!",
};

const renewToken = async () => {
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
    localStorage.setItem("accessToken", refreshTokenData.newAccessToken);
    window.location.reload();
  } catch (err) {
    console.log(
      `An error occured while renewing the access token ${JSON.stringify(err)}`
    );
  }
};

const handleError = (error, updateAlertBoxData) => {
  let response = "No response has been specified";
  if (error.response && error.response.status === 400) {
    response = ERRORS.AUTHORIZATION_ERROR;
  } else if (error.response && error.response.status === 401) {
    if (error.response.data.message === "Token expired") {
      renewToken();
    } else if (error.response.statusText === "Unauthorized") {
      response = ERRORS.AUTHORIZATION_ERROR;
    } else {
      response = ERRORS.AUTHORIZATION_ERROR;
    }
  } else if (error.response && error.response.status === 403) {
    response = error.response.message;
  } else if (error.response && error.response.status === 404) {
    response = ERRORS.BLANK_ERROR;
  } else if (error.response && error.response.status === 409) {
    response = ERRORS.DUPLICATION_ERROR;
  } else if (error.message === "Network Error") {
    response = ERRORS.NETWORK_ERROR;
  } else {
    response = ERRORS.SERVER_ERROR;
  }

  if (response !== "No response has been specified") {
    updateAlertBoxData({
      response: response,
      isResponse: true,
      status: "error",
      timeout: 2500,
    });
  }
};

export { handleError };
