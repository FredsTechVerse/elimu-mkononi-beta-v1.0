import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormNavigation, Modal, SubmitButton, AlertBox } from "..";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../controllers/postData";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import axios from "../../axios";
const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const from = location.state?.from?.pathname || "/";
  // Login Credentials.
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const createLoginMutation = useMutation({
    mutationFn: loginUser,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      updateAlertBoxData({
        response: "You have logged in successfully",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
      console.log({
        accessToken: localStorage.getItem("accessToken", data.accessToken),
        refreshToken: localStorage.getItem("refreshToken", data.refreshToken),
        roles: localStorage.getItem("roles", JSON.stringify(data.roles)),
      });
      navigate(from, { replace: true });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        const trimmedFirstName = firstName.trim();
        const trimmedPassword = password.trim();

        createLoginMutation.mutate({
          firstName: trimmedFirstName,
          password: trimmedPassword,
        });
        return;
      }
    },
  });

  const isFormValid = () => {
    if (firstName !== null && password !== null) {
      return true;
    }
    updateAlertBoxData({
      response: "Some input fields are empty",
      isResponse: true,
      status: "success",
      timeout: 3000,
    });
    return false;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(e);
      }
    };
    if (formRef.current) {
      formRef.current.addEventListener("submit", handleKeyPress);
    }
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener("submit", handleKeyPress);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const trimmedFirstName = firstName.trim();
      const trimmedPassword = password.trim();

      createLoginMutation.mutate({
        firstName: trimmedFirstName,
        password: trimmedPassword,
      });
      return;
    }
    updateAlertBoxData({
      response: "Some input fields are empty",
      isResponse: true,
      status: "success",
      timeout: 3000,
    });
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
          <div className="w-full flex-row-centered">
            <SubmitButton
              isSubmitting={createLoginMutation?.isLoading}
              isError={createLoginMutation?.isError}
              type="submit"
              text={
                createLoginMutation?.status === "loading"
                  ? "Logging in"
                  : "Log In"
              }
            />
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
