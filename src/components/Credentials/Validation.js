// HANDLING FRONTEND ERRORS
const ERRORS = {
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Invalid username or password.",
  BLANK_ERROR: "User not found",
};

const handleErrorOnFrontend = (err) => {
  if (err.response) {
    console.error("Status:", err.response.status); // outputs the status code (e.g. 404)
  }
  if (err.response && err.response.status === 401) {
    setMessage(ERRORS.VALIDATION_ERROR);
  } else if (err.response && err.response.status === 404) {
    setMessage(ERRORS.BLANK_ERROR);
  } else if (err.message === "Network Error") {
    setMessage(ERRORS.NETWORK_ERROR);
  } else {
    setMessage(ERRORS.SERVER_ERROR);
  }
};
export { handleErrorOnFrontend };
