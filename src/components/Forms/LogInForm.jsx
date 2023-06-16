import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";
import { AlertBox, FormNavigation, Modal, SubmitButton } from "..";
const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // Login Credentials.
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  // Alert Box Configurations
  const [statusTracker, setStatusTracker] = useState(false);
  const [responseTracker, setResponseTracker] = useState(false);
  const [message, setMessage] = useState("");

  const ERRORS = {
    NETWORK_ERROR: "Network error. Please try again later.",
    SERVER_ERROR: "Server error. Please try again later.",
    VALIDATION_ERROR: "Invalid username or password.",
    BLANK_ERROR: "User not found",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trimmedFirstName = firstName.trim();
      const trimmedPassword = password.trim();

      const credentials = {
        firstName: trimmedFirstName,
        password: trimmedPassword,
      };
      // const credentials = { firstName, password };
      const { data, status } = await axios.post("/auth/login", credentials);

      if (status === 200) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(`Login Error : ${err.stack}`);
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

      setStatusTracker(false);
      setResponseTracker(true);

      setTimeout(() => {
        setResponseTracker(false);
      }, 3000);
    }
  };

  return (
    <Modal>
      <div className="form-wrap h-[320px]">
        <FormNavigation text="Log In" />

        <form className="form-styling" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="surname">Username</label>
            <input
              id="email"
              name="surname"
              placeholder="Type first name "
              type="text"
              className="input-styling"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className="input-styling"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={message}
          />
          <div className="cta-wrap ">
            <SubmitButton type="submit" text="Log In" />
          </div>

          <p className="mt-1 text-center text-sm text-white ">
            <span>Not registered?</span>
            <span className="mx-2 text-black">
              <Link
                to={"/new-student"}
                className="font-medium text-slate-800 hover:text-indigo-500 focus:outline-none focus:ring-2"
              >
                Sign up
              </Link>
            </span>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default LogInForm;
