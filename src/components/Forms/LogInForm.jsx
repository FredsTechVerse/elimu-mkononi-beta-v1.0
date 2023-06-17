import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormNavigation, Modal, Button } from "..";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/postData";
import { handleError } from "../../api/errorHandling";
const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const from = location.state?.from?.pathname || "/";
  // Login Credentials.
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const authorizeLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      navigate(from, { replace: true });
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const isFormValid = () => {
    if (firstName !== null && password !== null) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const trimmedFirstName = firstName.trim();
      const trimmedPassword = password.trim();

      const credentials = {
        firstName: trimmedFirstName,
        password: trimmedPassword,
      };
      authorizeLogin.mutate(credentials);
      return;
    }
    console.log("Form is not valid");
  };

  return (
    <Modal>
      <div className="form-container-styling">
        <FormNavigation text="Log In" />

        <form className="form-styling">
          <div className="input-wrap">
            <label htmlFor="surname">Username</label>
            <input
              id="email"
              name="surname"
              placeholder="Your username is your first name"
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
