import { handleLogout, renewToken } from "../controllers";
const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "The resource / user does not exist",
  DUPLICATION_ERROR: "This document already exists!",
  INVALID_TOKEN: "Your token is invalid!",
  INVALID_ID: " The resource identity is invalid!",
  BAD_REQUEST: "Bad request sent to server ",
  LOGOUT: "Unauthorzied!Logging out.",
};

const handleError = async (error, updateAlertBoxData) => {
  let response = "No response has been specified";
  let status = error?.response?.status;
  let message = error?.response?.data?.message;
  if (status === 400) {
    response = message;
  } else if (status === 401) {
    if (message === "Token expired") {
      renewToken({ updateAlertBoxData });
    } else if (response.statusText === "Unauthorized") {
      response = ERRORS.AUTHORIZATION_ERROR;
    } else {
      response = message;
    }
  } else if (status === 403) {
    handleLogout();
    response = ERRORS.LOGOUT;
  } else if (status === 404) {
    if (message) {
      response = message;
    } else {
      response = ERRORS.BLANK_ERROR;
    }
  } else if (status === 409) {
    response = message;
  } else if (status === 422) {
    response = message;
  } else if (status === 500) {
    if (message) {
      response = message;
    } else {
      response = ERRORS.INVALID_ID;
    }
  } else if (error?.message === "Network Error") {
    response = ERRORS.NETWORK_ERROR;
  } else {
    console.log(error);
    response = ERRORS.SERVER_ERROR;
  }

  if (response !== "No response has been specified") {
    updateAlertBoxData({
      response: response,
      isResponse: true,
      status: "error",
      timeout: 4500,
    });
  }
};

export { handleError };
