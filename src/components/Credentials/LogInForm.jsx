import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";
import { AlertBox, CustomNav, Modal, Button } from "..";
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
      const credentials = { firstName, password };
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
      <div className="bg-slate-300  bg-opacity-50 flex flex-col justify-cs items-center tablet:3/5 laptop:w-2/5 phone:w-full">
        <CustomNav text="Log In" />

        <form className="border-none flex-col px-5 phone:px-2 w-full phone:border-2  phone:rounded-b-md">
          <div className="input-wrap">
            <label htmlFor="surname">Username</label>
            <input
              id="email"
              name="surname"
              placeholder="Your username is your first name"
              type="text"
              className="input-styling w-full"
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
              className="input-styling w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={message}
          />
          <div className="w-full flex-row-centered">
            <Button
              type="button"
              text="Log In"
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </div>

          <p className="mt-2 text-center text-sm text-white ">
            <span>Not registered?</span>
            <span className="mx-2">
              <Link
                to={"/new-student"}
                className="font-medium text-indigo-700 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
