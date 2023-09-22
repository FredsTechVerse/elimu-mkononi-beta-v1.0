import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyContact, handleError } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import axios from "../../axios";
import { useForm } from "react-hook-form";

import { ForgotPasswordFormSyntax } from "../../components";

const ForgotPasswordForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { background } = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact: "",
      email: "",
      role: "",
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
      const { accessToken, role, userID } = data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
      email: formData.email,
      role: formData.role,
    });
  };

  const handleContactVerification = async (data) => {
    const { contact, email, role } = data;
    contactVerificationMutation.mutate({
      contact: `254${contact}`,
      email,
      role,
    });
    return;
  };

  return (
    <ForgotPasswordFormSyntax
      handleSubmit={handleSubmit}
      handleContactVerification={handleContactVerification}
      register={register}
      errors={errors}
      contactVerificationMutation={contactVerificationMutation}
    />
  );
};

export default ForgotPasswordForm;
