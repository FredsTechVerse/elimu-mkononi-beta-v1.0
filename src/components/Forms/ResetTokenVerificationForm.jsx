import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmResetToken, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { ResetTokenVerificationFormSyntax } from "../../components";

const ResetTokenVerificationForm = () => {
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
      resetToken: "",
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

  const resetTokenConfirmationMutation = useMutation({
    mutationFn: confirmResetToken,
    onSuccess: (data) => {
      updateAlertBoxData({
        response: "Reset Token confirmed !",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate("/update-password", {
        state: {
          background,
          role,
          userID,
        },
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryResetTokenConfirmationMutation(error.config.data);
      }
    },
  });

  const retryResetTokenConfirmationMutation = (formData) => {
    resetTokenConfirmationMutation.mutate({
      resetToken: formData.resetToken,
    });
  };

  const handleResetToken = async (data) => {
    const { resetToken } = data;
    resetTokenConfirmationMutation.mutate({
      resetToken: resetToken.trim(),
    });
    return;
  };

  return (
    <ResetTokenVerificationFormSyntax
      watch={watch}
      handleSubmit={handleSubmit}
      handleResetToken={handleResetToken}
      register={register}
      errors={errors}
      resetTokenConfirmationMutation={resetTokenConfirmationMutation}
    />
  );
};

export default ResetTokenVerificationForm;
