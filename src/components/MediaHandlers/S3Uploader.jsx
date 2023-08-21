import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "../../axios";
import axios from "axios";
import { CircularProgressBar } from "../../components";
import { handleError, verifyAccess } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery } from "@tanstack/react-query";

const S3Uploader = ({ updateFileName }) => {
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const { updateAlertBoxData } = useAlertBoxContext();
  const trackProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentCompleted(percentCompleted);
    if (percentCompleted == 100) {
      setPercentCompleted(0);
      setIsUploadComplete(true);
    }
  };

  useQuery(["accessVerification"], verifyAccess, {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });

  const handleDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const { type } = file;
      const body = {
        fileType: type,
      };
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await Axios.post("/file/", body, config);
      const { signedUrl, Key } = data;

      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: trackProgress,
      });
      updateFileName(Key);
    } catch (error) {
      handleError(error, updateAlertBoxData);
    }
  };
  return (
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {!percentCompleted && !isUploadComplete ? (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="dropzone flex-col-centered w-full h-full "
            >
              <input {...getInputProps()}></input>
              <p className="mb-2 text-center">Drag and drop a file here</p>
              <button
                type="button"
                className="bg-primary text-white w-32 h-8 rounded-full"
              >
                Select File
              </button>
            </div>
          )}
        </Dropzone>
      ) : percentCompleted && !isUploadComplete ? (
        <div className="flex flex-col-centered w-full h-full ">
          <CircularProgressBar percentCompleted={percentCompleted} />
        </div>
      ) : (
        <div className={`w-72 tablet:w-[360px] my-3  `}>
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
            <p className="text-center">Upload complete</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default S3Uploader;
