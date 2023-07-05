import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProgressBar } from "..";

const YoutubeUploader = ({ verifyUpload, updateFileName, videoTitle }) => {
  console.log(`Video Titles has been set to ${videoTitle}`);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const videoUploadUrl =
    "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet";
  const videoDescription = "video description 1";
  const accessToken =
    "ya29.a0AbVbY6MusYNsMDzIms8cVpceMQne27vZWr4cOID5b6PTLFm9NGDOZ4pas7yspQpftGQS4hjk77I09eQBXt3Gm0suTvw5Bqi0KsCDxe6NtCfaL3qECXfA0sMBc_6kBx-GF36_JBIVjBHDlWTVqYYk8DeE90RJaCgYKATISARASFQFWKvPlqbqrqoPa6gLLExSISR1F5w0163";

  const trackUploadProgress = (progressEvent) => {
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
      const videoFile = acceptedFiles[0];
      const { type: videoType } = videoFile;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const metadata = {
        snippet: {
          title: videoTitle,
          description: videoDescription,
        },
        status: {
          privacyStatus: "private",
        },
      };

      const response = await axios.post(videoUploadUrl, metadata, {
        headers: headers,
        params: {
          uploadType: "resumable",
          part: "snippet,status",
        },
      });

      // Get the location header from the response
      const location = response.headers.location;

      // Upload the video file using a PUT request
      const fullUploadBody = await axios.put(location, videoFile, {
        headers: {
          "Content-Type": videoType,
        },
        onUploadProgress: trackUploadProgress,
      });
      updateFileName(videoTitle);
      console.log(fullUploadBody);
    } catch (error) {
      console.error("Error uploading file.", error);
    }
  };
  return (
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {percentCompleted ? (
        <div className="flex flex-col-centered gap-5 p-3 w-full h-full ">
          <p> Uploading file ...</p>
          <CircularProgressbar
            value={percentCompleted}
            text={`${percentCompleted}%`}
          />
          ;<div>{percentCompleted} % complete </div>
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

export default YoutubeUploader;
