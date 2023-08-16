import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
  ErrorMessage,
} from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyAccess, createResource, handleError } from "../../controllers";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const ResourceForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();
  const location = useLocation();
  const { chapterID } = location?.state;
  const [resourceUrl, setResourceUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resourceName: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const accessQuery = useQuery(["accessVerification"], () => verifyAccess(), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        saveResource(e);
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

  const createResourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: (data) => {
      queryClient.setQueryData(["resources", data._id], data);
      queryClient.invalidateQueries(["resources"], { exact: true });
      updateAlertBoxData({
        response: "Resource has been saved",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryMutation(error.config.data);
      }
    },
  });

  const retryMutation = (formData) => {
    createChapterMutation.mutate({
      resourceName: formData.resourceName,
      resourceUrl: formData.resourceUrl,
      chapterID: formData.chapterID,
    });
  };

  const saveResource = async (data) => {
    const { resourceName } = data;
    if (resourceUrl && chapterID) {
      createResourceMutation.mutate({
        resourceName: resourceName,
        resourceUrl: resourceUrl,
        chapterID: chapterID,
      });
      return;
    }
    updateAlertBoxData({
      response: "Chapter ID has not been specified.",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  const updateFileName = (resourceUrl) => {
    setResourceUrl(resourceUrl);
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="RESOURCE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveResource)}
        >
          <div className="input-wrap">
            <label htmlFor="resource">Resource Details</label>
            <input
              className="input-styling"
              placeholder="Name of file"
              {...register("resourceName", {
                required: "This field is required ",
              })}
            />

            {errors.resourceName && (
              <ErrorMessage message={errors.resourceName?.message} />
            )}
          </div>
          <div className="input-wrap ">
            {!resourceUrl ? (
              <S3Uploader
                isTokenActive={accessQuery.status === "success"}
                updateFileName={updateFileName}
              />
            ) : (
              <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg flex flex-col items-center gap-2 py-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <p className="text-center">
                  Resource has been sucessfully uploaded
                </p>
              </div>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              isSubmitting={createResourceMutation?.isLoading}
              disabled={resourceUrl && chapterID ? false : true}
              text={
                createResourceMutation?.status === "loading"
                  ? "Uploading"
                  : "Upload"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResourceForm;
