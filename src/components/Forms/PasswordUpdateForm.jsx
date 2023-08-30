import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import {
  ErrorMessage,
  FormNavigation,
  Modal,
  SubmitButton,
} from "../../components";

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
    console.log({ password, cPassword, role, userID });
    if (password === cPassword) {
      updatePasswordMutation.mutate({
        password,
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
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Update Password" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handlePasswordUpdate)}
        >
          <div className="input-wrap">
            <label htmlFor="course">New Password</label>
            <input
              className="input-styling"
              placeholder="Enter new password"
              {...register("password", {
                required: "This fyield is required ",
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>
          <div className="input-wrap mt-3">
            <label htmlFor="course">Confirm Password</label>

            <input
              className="input-styling"
              placeholder="Confirm New Password"
              {...register("cPassword", {
                required: "This field is required ",
              })}
            />
            {errors.cPassword && (
              <ErrorMessage message={errors.cPassword?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                disabled={watch("password") ? false : true}
                isSubmitting={updatePasswordMutation.isLoading}
                text={updatePasswordMutation.isLoading ? "Saving" : "Save"}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PasswordUpdateForm;
