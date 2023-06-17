const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHORIZATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "User not found",
  DUPLICATION_ERROR: "This document already exists!",
};

const handleError = (error) => {
  if (error.response && error.response.status === 400) {
    console.log(ERRORS.AUTHORIZATION_ERROR);
  } else if (error.response && error.response.status === 401) {
    console.log(ERRORS.AUTHORIZATION_ERROR);
  } else if (error.response && error.response.status === 404) {
    console.log(ERRORS.BLANK_ERROR);
  } else if (error.response && error.response.status === 409) {
    console.log(ERRORS.DUPLICATION_ERROR);
  } else if (error.message === "Network Error") {
    console.log(ERRORS.NETWORK_ERROR);
  } else {
    console.log(ERRORS.SERVER_ERROR);
  }
};

export { handleError };
