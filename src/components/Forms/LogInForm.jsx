import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormNavigation, Modal, SubmitButton } from "..";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../controllers/postData";
import { handleError } from "../../controllers/handleErrors";
const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
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
    if (isFormValid()) {
      console.log("Submitting data");
      const trimmedFirstName = firstName.trim();
      const trimmedPassword = password.trim();

      authorizeLogin.mutate({
        firstName: trimmedFirstName,
        password: trimmedPassword,
      });
      return;
    }
    console.log("Form is not valid");
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
              type="submit"
              text="Log In"
              onClick={(e) => {
                handleSubmit(e);
              }}
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
