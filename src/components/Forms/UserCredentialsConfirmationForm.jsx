import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmUserCredentials, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { ErrorMessage, FormNavigation, Modal, SubmitButton } from "..";

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
    console.log({ contactVerification, emailVerification });
    userCredentialsConfirmationMutation.mutate({
      contactVerification,
      emailVerification,
      role,
      userID,
    });
    return;
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Verify Account" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleResetToken)}
        >
          <div className="input-wrap">
            <label htmlFor="course">Contact verification code</label>
            <input
              className="input-styling"
              placeholder="Enter confirmation code sent to your phone number"
              {...register("contactVerification", {
                required: "This field is required ",
              })}
            />
            {errors.resetToken && (
              <ErrorMessage message={errors.resetToken?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="course">Email verification Code</label>
            <input
              className="input-styling"
              placeholder="Enter confirmation code sent to your email"
              {...register("emailVerification", {
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
                disabled={
                  watch("contactVerification") && watch("emailVerification")
                    ? false
                    : true
                }
                isSubmitting={userCredentialsConfirmationMutation.isLoading}
                text={
                  userCredentialsConfirmationMutation.isLoading
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

export default UserCredentialsConfirmationForm;
