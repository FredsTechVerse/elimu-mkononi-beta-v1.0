const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "The resource / user does not exist",
  DUPLICATION_ERROR: "This document already exists!",
};

const handleError = (error, updateAlertBoxData) => {
  console.log(error);
  const timeout = 2500;
  const status = error.status;
  if (error.response && error.response.status === 400) {
    updateAlertBoxData({
      response: ERRORS.AUTHORIZATION_ERROR,
      isResponse: true,
      status: status,
      timeout: timeout,
    });
  } else if (error.response && error.response.status === 401) {
    // I need to destructure futher the response it can be a token or a jwt if token expired we need to renew our token silently and retry request.
    console.log(
      `Unauthorized error response ${JSON.stringify(error.response)}`
    );
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
