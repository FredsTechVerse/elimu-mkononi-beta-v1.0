import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
} from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessageData, messageUser, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const MessageForm = () => {
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  const location = useLocation();
  const navigate = useNavigate();

  const isMessageQueryEnabled = messageID ? true : false;
  const from = location.state?.background?.pathname;
  const messageID = location?.state?.messageID;
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
        handleSubmit(saveMessage)(e);
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
      recipient: formData.recipient,
      message: formData.message,
    });
  };

  const saveMessage = async (data) => {
    const { recipient, message } = data;
    console.log({ recipient, message });
    if (!isMessageQueryEnabled) {
      createMessageMutation.mutate({
        recipient: `0${recipient}`,
        message,
      });
      return;
    }
    updateAlertBoxData({
      response: "Something went wrong while writing the message",
      isResponse: true,
      status: "success",
      timeout: 4500,
    });
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Message Form" />
        <form className="form-styling" onSubmit={handleSubmit(saveMessage)}>
          {/* FILE */}
          <div className="input-wrap gap-2">
            <label htmlFor="cNumber" className="w-full ">
              Recipient
            </label>
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
                placeholder="Enter Safaricom No."
                {...register("recipient", {
                  required: "This field is required ",
                })}
              />
            </div>

            {errors.recipient && (
              <ErrorMessage message={errors.recipient?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="cNumber" className="w-full ">
              Message
            </label>
            <textarea
              readOnly={!!isMessageQueryEnabled}
              placeholder="Description"
              {...register("message", {
                required: "This field is required ",
              })}
            ></textarea>
            {errors.message && (
              <ErrorMessage message={errors.message?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`flex flex-row gap-5 items-center"
              `}
            >
              <SubmitButton
                type="submit"
                disabled={
                  watch("recipient") !== "" && watch("message") !== ""
                    ? false
                    : true
                }
                isSubmitting={createMessageMutation.isLoading}
                text={createMessageMutation.isLoading ? "Sending" : "Send"}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MessageForm;
