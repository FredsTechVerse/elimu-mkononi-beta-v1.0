import { useAlertBoxContext } from "../context/AlertBoxContext";
const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "The resource / user does not exist",
  DUPLICATION_ERROR: "This document already exists!",
};

const handleError = (error) => {
  console.log("Error currently being handled");
  const { alertBoxData, updateAlertBoxData } = useAlertBoxContext();
  console.log(alertBoxData);
  const timeout = 3500;
  const status = status;
  console.log(error.response.status);
  if (error.response && error.response.status === 400) {
    updateAlertBoxData({
      response: ERRORS.AUTHORIZATION_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else if (error.response && error.response.status === 401) {
    updateAlertBoxData({
      response: ERRORS.AUTHORIZATION_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else if (error.response && error.response.status === 404) {
    updateAlertBoxData({
      response: ERRORS.BLANK_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else if (error.response && error.response.status === 409) {
    updateAlertBoxData({
      response: ERRORS.DUPLICATION_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else if (error.message === "Network Error") {
    updateAlertBoxData({
      response: ERRORS.NETWORK_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else {
    updateAlertBoxData({
      response: ERRORS.SERVER_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  }
};

export { handleError };
