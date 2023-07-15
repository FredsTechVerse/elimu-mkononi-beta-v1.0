import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axios";
import { CircularProgressBar } from "../../components";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const YoutubeUploader = ({ verifyUpload, updateFileInfo, videoTitle }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const [percentCompleted, setPercentCompleted] = useState(0);
  const videoUploadUrl = import.meta.env.VITE_VIDEO_UPLOAD_LINK;
  const videoDescription = "video description 1";
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

  const authorizeUser = async () => {
    try {
      console.log("Fetching authorization uri");
      const { data: authorizationUri } = await axios.get(
        "/oAuth/authorizationUri"
      );
      console.log(authorizationUri);
      return authorizationUri;
    } catch (err) {
      console.log(`Error during authorization ${err}`);
    }
  };

  const fetchAccessToken = () => {
    const accessToken = localStorage.getItem("youtubeAccessToken");
    return accessToken;
  };

  const redirectToExternalLink = (externalLink) => {
    window.open(externalLink, "_self");
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      // The acceptedFiles is a cabinet box containing our files all arranged in order from first to last.
      const videoFile = acceptedFiles[0];
      const { type: videoType } = videoFile;
      const accessToken = fetchAccessToken();
      if (!accessToken) {
        const authorizationUri = await authorizeUser();
        localStorage.setItem("previousLocation", window.location.pathname);
        redirectToExternalLink(authorizationUri);
      }
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
          privacyStatus: "unlisted",
        },
      };

      const response = await axios.post(videoUploadUrl, metadata, {
        headers: headers,
        params: {
          uploadType: "resumable",
          part: "snippet,status",
        },
      });

      // Extract the location header aka the presigned url.
      const presignedUrl = response.headers.location;

      // Upload the video file using a PUT request
      const { data: videoData } = await axios.put(presignedUrl, videoFile, {
        headers: {
          "Content-Type": videoType,
        },
        onUploadProgress: trackUploadProgress,
      });
      const { id: videoID, kind: videoKind } = videoData;
      console.log(`The video id of the uploaded video ${videoID}`);
      const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;
      updateFileInfo({ videoUrl, videoKind });
    } catch (error) {
      console.log(error);
      handleError(error, updateAlertBoxData);
      //  I will need to handle the youtube renew token error.
    }
  };
  return (
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {percentCompleted > 0 ? (
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

export default YoutubeUploader;
