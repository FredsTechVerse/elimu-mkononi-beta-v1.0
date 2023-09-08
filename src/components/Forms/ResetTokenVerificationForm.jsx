import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmResetToken, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { ErrorMessage, FormNavigation, Modal, SubmitButton } from "..";

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
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Reset Token" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleResetToken)}
        >
          <div className="input-wrap">
            <label htmlFor="course">Reset Token</label>
            <input
              className="input-styling"
              placeholder="Enter reset token"
              {...register("resetToken", {
                required: "This field is required ",
              })}
            />
            {errors.resetToken && (
              <ErrorMessage message={errors.resetToken?.message} />
            )}
          </div>
          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                disabled={watch("resetToken") ? false : true}
                isSubmitting={resetTokenConfirmationMutation.isLoading}
                text={
                  resetTokenConfirmationMutation.isLoading
                    ? "Verifying"
                    : "Verify"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetTokenVerificationForm;
