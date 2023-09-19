import React, { useEffect, useRef } from "react";
import { MessageFormSyntax } from "../../components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessageData, messageUser, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const MessageForm = () => {
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();
  const { role, userID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const messageID = location?.state?.messageID;
  const isMessageQueryEnabled = messageID ? true : false;
  const from = location.state?.background?.pathname;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipient: "",
      contact: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(sendMessage)(e);
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

  const messageQuery = useQuery(
    ["message", messageID],
    () => fetchMessageData({ messageID }),
    {
      enabled: isMessageQueryEnabled,
      staleTime: 1000 * 60 * 60,

      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["message", messageID], {
            exact: true,
          });
        }
      },
    }
  );

  useEffect(() => {
    if (messageQuery?.status === "success" && messageQuery?.data) {
      setValue("recipient", messageQuery?.data?.recipient);
      setValue("message", messageQuery?.data?.message);
    }
  }, [messageID, messageQuery?.status]);

  const createMessageMutation = useMutation({
    mutationFn: messageUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["message", messageID], data);
      updateAlertBoxData({
        response: "Message has been sent",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(from);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryCreatingMessageMutation(error.config.data);
      }
    },
  });

  const retryCreatingMessageMutation = (formData) => {
    createMessageMutation.mutate({
      contact: formData.contact,
      message: formData.message,
      recipient: formData.recipient,
    });
  };

  const sendMessage = async (data) => {
    const { contact, message, recipient, email } = data;
    if (!isMessageQueryEnabled && recipient === "other") {
      createMessageMutation.mutate({
        contact: `254${contact}`,
        email,
        message,
        recipient,
      });
    } else if (!isMessageQueryEnabled && recipient !== "other") {
      createMessageMutation.mutate({
        recipient,
        message,
      });
    } else {
      updateAlertBoxData({
        response: "Something went wrong while sending message",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
    }
  };

  return (
    <MessageFormSyntax
      role={role}
      userID={userID}
      watch={watch}
      handleSubmit={handleSubmit}
      sendMessage={sendMessage}
      register={register}
      errors={errors}
      messageQuery={messageQuery}
      createMessageMutation={createMessageMutation}
    />
  );
};

export default MessageForm;
