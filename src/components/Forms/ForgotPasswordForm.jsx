import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  confirmResetToken as verifyContact,
  handleError,
} from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import { ErrorMessage, FormNavigation, Modal, SubmitButton } from "..";

const ForgotPasswordForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { background } = location.state;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(handleContactVerification)(e);
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

  const contactVerificationMutation = useMutation({
    mutationFn: verifyContact,
    onSuccess: (data) => {
      const { role, userID } = data;
      console.log({ role, userID });
      updateAlertBoxData({
        response: "Contact information has been confirmed",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate("/reset-token", {
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
        retryContactVerificationMutation(error.config.data); // Retry with captured form data
      }
    },
  });

  const retryContactVerificationMutation = (formData) => {
    contactVerificationMutation.mutate({
      contact: formData.contact,
    });
  };

  const handleContactVerification = async (data) => {
    const { contact } = data;
    console.log({ contact });
    contactVerificationMutation.mutate({
      contact: `254${contact}`,
    });
    return;
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Forgot Password" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleContactVerification)}
        >
          <div className="input-wrap">
            <label htmlFor="contact">Contact</label>
            <div className="flex phone:gap-3 tablet:gap-2">
              <input
                className="input-styling w-16"
                type="Text"
                required
                value="+254"
                readOnly
              />
              <input
                className="input-styling phone:w-52  tablet:w-72"
                placeholder="Safaricom No."
                {...register("contact", {
                  required: "This field is required ",
                })}
              />
            </div>
            {errors.contact && (
              <ErrorMessage message={errors.contact?.message} />
            )}
          </div>
          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                disabled={watch("resetToken") ? false : true}
                isSubmitting={contactVerificationMutation.isLoading}
                text={contactVerificationMutation.isLoading ? "Saving" : "Save"}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordForm;
