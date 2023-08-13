import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "../../axios";
import axios from "axios";
import { CircularProgressBar } from "../../components";
import { handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const S3Uploader = ({ verifyUpload, updateFileName, isTokenActive }) => {
  const [percentCompleted, setPercentCompleted] = useState(0);
  //  Simply tracks our progress from the config object.
  const { updateAlertBoxData } = useAlertBoxContext();
  const trackProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentCompleted(percentCompleted);
    if (percentCompleted == 100) {
      verifyUpload();
      setPercentCompleted(0);
    }
  };

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
      if (isTokenActive) {
        const { data } = await Axios.post("/s3Direct/", body, config);
        const { signedUrl, Key } = data;

        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: trackProgress,
        });
        updateFileName(Key);
      }
    } catch (error) {
      handleError(error, updateAlertBoxData);
    }
  };
  return (
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {percentCompleted ? (
        <div className="flex flex-col-centered w-full h-full ">
          <CircularProgressBar percentCompleted={percentCompleted} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default S3Uploader;
