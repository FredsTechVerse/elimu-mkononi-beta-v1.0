import React, { useEffect, useRef } from "react";
import { MessageFormSyntax } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessageData, messageUser, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const MessageForm = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const contact = new URLSearchParams(location.search).get("contact");
  const email = new URLSearchParams(location.search).get("email");

  const { updateAlertBoxData } = useAlertBoxContext();
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
      recipient: contact ? "individual" : "",
      contact: contact ? contact.split("254")[1] : "",
      email: email ? email : "",
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
    console.log("Sending message");
    const { message, recipient, email } = data;
    console.log({ contact, message, recipient, email });
    if (
      !isMessageQueryEnabled &&
      (recipient === "other" || recipient === "individual")
    ) {
      createMessageMutation.mutate({
        contact: contact ? contact : `254${data.contact}`,
        email,
        message,
        recipient,
      });
    } else if (
      !isMessageQueryEnabled &&
      (recipient !== "other" || recipient !== "individual")
    ) {
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
      email={email}
      contact={contact}
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
