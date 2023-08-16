import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormNavigation, Modal, SubmitButton, ErrorMessage } from "..";
import { useMutation } from "@tanstack/react-query";
import { loginUser, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import axios from "../../axios";
import { useForm } from "react-hook-form";

const LogInForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  // const from = location?.state?.from?.pathname || "/";
  // Login Credentials.
  // const [firstName, setFirstName] = useState("");
  // const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      password: "",
    },
  });

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

      if (data.roles.includes("EM-203")) {
        navigate("/admin", { replace: true });
      } else if (data.roles.includes("EM-202")) {
        navigate("/tutor", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryMutation(error.config.data);
      }
    },
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(login)(e);
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

  const login = async (data) => {
    const { firstName, password } = data;
    const trimmedFirstName = firstName.trim();
    const trimmedPassword = password.trim();

    createLoginMutation.mutate({
      firstName: trimmedFirstName,
      password: trimmedPassword,
    });
  };

  const retryMutation = (formData) => {
    createChapterMutation.mutate({
      firstName: formData.firstName,
      password: formData.password,
    });
  };

  return (
    <Modal>
      <div className="form-wrap">
        <FormNavigation text="Log In" />

        <form className="form-styling" onSubmit={handleSubmit(login)}>
          <div className="input-wrap">
            <label htmlFor="surname">Username</label>
            <input
              className="input-styling"
              placeholder="Type first name "
              {...register("firstName", {
                required: "This field is required ",
              })}
            />

            {errors.firstName && (
              <ErrorMessage message={errors.firstName?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              className="input-styling"
              {...register("password", {
                required: "This field is required ",
              })}
            />

            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>
          <div className="w-full flex-row-centered">
            <SubmitButton
              isSubmitting={createLoginMutation?.isLoading}
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
