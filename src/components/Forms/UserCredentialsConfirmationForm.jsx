import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmUserCredentials, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { UserCredentialsConfirmationFormSyntax } from "../../components";

const UserCredentialsConfirmationForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { role, userID } = location.state;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactVerification: "",
      emailVerification: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(handleResetToken)(e);
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

  const userCredentialsConfirmationMutation = useMutation({
    mutationFn: confirmUserCredentials,
    onSuccess: (data) => {
      updateAlertBoxData({
        response: "Email and phone number confirmed !",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate("/");
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUserCredentialsConfirmationMutation(error.config.data);
      }
    },
  });

  const retryUserCredentialsConfirmationMutation = (formData) => {
    userCredentialsConfirmationMutation.mutate({
      role: formData.role,
      userID: formData.userID,
      emailVerification: formData.emailVerification,
      contactVerification: formData.contactVerification,
    });
  };

  const handleResetToken = async (data) => {
    const { contactVerification, emailVerification } = data;
    userCredentialsConfirmationMutation.mutate({
      contactVerification,
      emailVerification,
      role,
      userID,
    });
    return;
  };

  return (
    <UserCredentialsConfirmationFormSyntax
      handleSubmit={handleSubmit}
      handleResetToken={handleResetToken}
      watch={watch}
      register={register}
      errors={errors}
      userCredentialsConfirmationMutation={userCredentialsConfirmationMutation}
    />
  );
};

export default UserCredentialsConfirmationForm;
