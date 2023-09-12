import { handleLogout, renewToken } from "../controllers";

const ERRORS = {
  NETWORK_ERROR: "We're experiencing a network issue. Please try again later.",
  SERVER_ERROR:
    "Oops! We're encountering technical difficulties. Please try again later.",
  AUTHORIZATION_ERROR:
    "Invalid username or password. Please check your credentials.",
  BLANK_ERROR: "The requested data does not exist.",
  DUPLICATION_ERROR:
    "This data already exists. Please provide unique information.",
  INVALID_TOKEN: "Your token is invalid. Please log in again.",
  INVALID_ID: "The resource identity is invalid or doesn't exist.",
  BAD_REQUEST:
    "A malformed request was sent to the server. Please check your request.",
  LOGOUT:
    "You are unauthorized to perform this action. You are being logged out.",
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
    } else if (message === "Account has not been verified") {
      response = "Account has not been verified";
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
  return response;
};

export { handleError };
