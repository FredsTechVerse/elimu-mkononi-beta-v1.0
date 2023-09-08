import { handleLogout, renewToken } from "../controllers";
const ERRORS = {
  NETWORK_ERROR: "Network error. Kindly try again later",
  SERVER_ERROR:
    "Ooops, we are currently encountering some issues.Kindly try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "This data does not exist",
  DUPLICATION_ERROR: "This data already exists!",
  INVALID_TOKEN: "Your token is invalid!",
  INVALID_ID: " The resource identity is invalid!",
  BAD_REQUEST: "Bad request sent to server ",
  LOGOUT: "Unauthorized user! Logging out.",
};

const handleError = async (error, updateAlertBoxData) => {
  let response = "No response specified";
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
      response = ERRORS.SERVER_ERROR;
    }
  } else if (error?.message === "Network Error") {
    response = ERRORS.NETWORK_ERROR;
  } else {
    response = ERRORS.SERVER_ERROR;
  }

  if (response !== "No response specified") {
    updateAlertBoxData({
      response: response,
      isResponse: true,
      status: "error",
      timeout: 4500,
    });
  }
};

export { handleError };
