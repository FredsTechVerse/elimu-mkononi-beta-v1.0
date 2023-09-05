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
  const location = useLocation();
  const { background } = location.state;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createLoginMutation = useMutation({
    mutationFn: loginUser,

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
        timeout: 4500,
      });

      if (data?.roles?.includes("EM-203")) {
        navigate("/admin", { replace: true });
      } else if (data?.roles?.includes("EM-202")) {
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
    const { email, password } = data;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    createLoginMutation.mutate({
      email: trimmedEmail,
      password: trimmedPassword,
    });
  };

  const retryMutation = (formData) => {
    createChapterMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <Modal>
      <div className="form-wrap pb-4">
        <FormNavigation text="Log In" />

        <form className="form-styling" onSubmit={handleSubmit(login)}>
          <div className="input-wrap">
            <label htmlFor="surname">Email</label>
            <input
              className="input-styling"
              placeholder="Enter your email "
              {...register("email", {
                required: "This field is required ",
              })}
            />

            {errors.email && <ErrorMessage message={errors.email?.message} />}
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
            <span className="mx-2 text-black">
              <Link
                to={"/new-user"}
                state={{ background: background }}
                className="font-medium hover:text-slate-100 text-primary focus:outline-none focus:ring-2"
              >
                Register
              </Link>
            </span>
            <span className="mx-2 text-black">
              <Link
                to={"/forgot-password"}
                state={{ background: background }}
                className="font-medium hover:text-slate-100 text-primary focus:outline-none focus:ring-2"
              >
                Forgot Password
              </Link>
            </span>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default LogInForm;
