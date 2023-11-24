import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginFormSyntax } from "../../components";
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
  const role = JSON.parse(localStorage.getItem("roles"));
  let roleInformation = role;
  if (!role) {
    roleInformation = "EM-201";
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  const {
    register,
    handleSubmit,
    watch,
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
      handleError(error, updateAlertBoxData, navigate, background);
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

    createLoginMutation.mutate({
      email: email.trim(),
      password: password.trim(),
    });
  };

  const retryMutation = (formData) => {
    createLoginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <LoginFormSyntax
      background={background}
      handleSubmit={handleSubmit}
      roleInformation={roleInformation}
      watch={watch}
      login={login}
      register={register}
      errors={errors}
      createLoginMutation={createLoginMutation}
    />
  );
};

export default LogInForm;
