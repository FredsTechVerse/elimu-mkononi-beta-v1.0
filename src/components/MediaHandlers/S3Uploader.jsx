import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axios";
import { ProgressBar } from "..";

const S3Uploader = ({ verifyUpload, updateFileName }) => {
  const [percentCompleted, setPercentCompleted] = useState(0);
  //  Simply tracks our progress from the config object.
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
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {percentCompleted ? (
        <div className="flex flex-col-centered gap-5 p-3 w-full h-full ">
          <p> Uploading file ...</p>
          <ProgressBar progress={percentCompleted} />
          <div>{percentCompleted} % complete </div>
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
