import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { PasswordUpdateFormSyntax } from "../../components";

const PasswordUpdateForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { background, role, userID } = location.state;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      cPassword: "",
      resetForm: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(handlePasswordUpdate)(e);
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

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      updateAlertBoxData({
        response: "Password has been successfully updated",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryPasswordMutation(error.config.data); // Retry with captured form data
      }
    },
  });

  const retryPasswordMutation = (formData) => {
    updatePasswordMutation.mutate({
      password: formData.password,
    });
  };

  const handlePasswordUpdate = async (data) => {
    const { password, cPassword } = data;
    if (password === cPassword) {
      updatePasswordMutation.mutate({
        password: password.trim(),
        role,
        userID,
      });
      return;
    }
    updateAlertBoxData({
      response: "The passwords do not match",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <PasswordUpdateFormSyntax
      watch={watch}
      handleSubmit={handleSubmit}
      handlePasswordUpdate={handlePasswordUpdate}
      register={register}
      errors={errors}
      updatePasswordMutation={updatePasswordMutation}
    />
  );
};

export default PasswordUpdateForm;
