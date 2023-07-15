import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { createResource } from "../../controllers/postData";
import { useMutation } from "@tanstack/react-query";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const ResourceForm = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const navigate = useNavigate();
  // FORM CONFIGURATIONS
  //=========================
  const [resourceName, setResourceName] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSave(e);
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

  const saveResource = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (isFormValid) {
        saveResource.mutate({
          resourceName: resourceName,
          resourceUrl: resourceName,
        });
      }
    },
  });

  const isFormValid = () => {
    if (resourceName !== null && uploadSuccess) {
      return true;
    }
    updateAlertBoxData({
      response: "Some input fields are empty",
      isResponse: true,
      status: "success",
      timeout: 3000,
    });
    return false;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      saveResource.mutate({
        resourceName: resourceName,
        resourceUrl: resourceName,
      });
    }
  };

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    setResourceName(fileName);
  };

  return (
    <Modal>
      <div className="form-wrap">
        <FormNavigation text="RESOURCE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSave}
        >
          <div className="input-wrap">
            <label htmlFor="course" className="w-full ">
              File Details
            </label>
            <input
              className="input-styling w-full"
              id="course"
              type="text"
              placeholder="Enter file name"
              value={resourceName}
              onChange={(e) => {
                setResourceName(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-wrap ">
            {!uploadSuccess ? (
              <S3Uploader
                verifyUpload={verifyUpload}
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
                  The resource has been sucessfully uploaded
                </p>
              </div>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              disabled={uploadSuccess ? false : true}
              isSubmitting={saveResource?.isLoading}
              text={saveResource?.status === "loading" ? "Saving" : "Save"}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResourceForm;
