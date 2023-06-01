import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axios";
import { ProgressBar } from "..";

const S3Uploader = ({ verifyUpload, updateFileName }) => {
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  //  Simply tracks our progress from the config object.
  const trackProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentCompleted(percentCompleted);
    if (percentCompleted == 100) {
      verifyUpload();
      setTimeout(() => {
        setPercentCompleted(0);
      }, 1200);
    }
  };
  const handleDrop = async (acceptedFiles) => {
    try {
      // The acceptedFiles is a cabinet box containing our files all arranged in order from first to last.

      const file = acceptedFiles[0];
      const { type } = file;
      // Prep request to db for signed url
      const formData = new FormData();
      formData.append("fileType", type);
      // Additional configs
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      // Request to axios
      const { data } = await axios.post("/s3Direct/", formData, config);
      const { signedUrl, Key } = data;
      console.log("Signed URL & Key", signedUrl, Key);
      // Uploading via the presigned url.
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: trackProgress,
      });
      updateFileName(Key);
      // setFileName(Key);
      // Perform any additional actions after the upload is complete, such as saving data to the database
    } catch (error) {
      console.error("Error uploading file.", error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center w-full p-4">
      {percentCompleted ? (
        <div className="flex flex-col w-full h-48 bg-slate-200 rounded-lg  text-center items-center justify-center">
          {!uploadSuccess ? (
            <>
              <p> Your file is uploading .... Please wait.</p>
              <ProgressBar progress={percentCompleted} />
            </>
          ) : (
            <p>Upload has been completed successfully !</p>
          )}
        </div>
      ) : (
        <div className="w-full">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="dropzone flex flex-col w-full h-48  bg-slate-200 rounded-lg  text-center items-center justify-center"
              >
                <input
                  className="border-2 border-red-300"
                  {...getInputProps()}
                ></input>
                <p className="mb-2 text-center">Drag and drop a file here</p>
                <button
                  type="button"
                  className="bg-primary text-white w-40 py-1.5 rounded-full"
                >
                  Select File
                </button>
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
};

export default S3Uploader;
