//  Before making an upload , i simply need to confirm token expirataion time with the current
// time to trigger a refresh token fetch. The refresh token will always be stored in my backend.

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { CircularProgressBar } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import {
  getYoutubeAuthorizationURI,
  handleError,
  redirectToExternalLink,
  fetchPresignedUrl,
  uploadVideoToYoutube,
} from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const YoutubeUploader = ({ updateFileInfo, videoTitle, lessonState }) => {
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const accessToken = localStorage.getItem("youtubeAccessToken");
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [isQueryEnabled, setIsQueryEnabled] = useState(
    accessToken ? false : true
  );

  // Fetches the access token if not present.
  useQuery(["authorizationURI"], getYoutubeAuthorizationURI, {
    enabled: isQueryEnabled,
    staleTime: 60 * 60 * 1000,
    retry: 1,
    onSuccess: (data) => {
      redirectToExternalLink({
        data,
        lessonState,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["authorizationURI"]);
      }
    },
  });

  const trackUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentCompleted(percentCompleted);
    if (percentCompleted == 100) {
      setPercentCompleted(0);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const videoFile = acceptedFiles[0];
      const currentTime = Date.now();
      const youtubeAccessTokenExpiryTime = localStorage.getItem(
        "youtubeAccessTokenExpiryDate"
      );

      const videoUploadUrl = import.meta.env.VITE_VIDEO_UPLOAD_LINK;
      const videoDescription = "Youtube is the new red university!";

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
          privacyStatus: "unlisted",
        },
      };

      if (currentTime < youtubeAccessTokenExpiryTime) {
        const presignedUrl = await fetchPresignedUrl({
          videoUploadUrl,
          metadata,
          headers,
        });
        const videoUrl = await uploadVideoToYoutube({
          presignedUrl,
          videoFile,
          videoType,
          trackUploadProgress,
        });

        updateFileInfo({ videoUrl });
      } else {
        //  Refresh Access Token and retry the put request logic
        updateAlertBoxData({
          response: "Your token has expired. Kindly logout and login again.",
          isResponse: true,
          status: "error",
          timeout: 4500,
        });
      }
    } catch (error) {
      console.error(error);
      handleError(error, updateAlertBoxData);
    }
  };

  return (
    <div className="h-36  w-72 tablet:w-[360px] mt-2 bg-slate-300  bg-opacity-60 rounded-lg ">
      <div className="w-full h-full">
        {percentCompleted > 0 ? (
          <div className="flex flex-col-centered w-full h-full ">
            <CircularProgressBar percentCompleted={percentCompleted} />
          </div>
        ) : (
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="dropzone flex-col-centered h-full "
              >
                <input {...getInputProps()}></input>
                <p className="text-center mb-2">
                  You can drag and drop your video here
                </p>
                <button
                  type="button"
                  className="bg-primary text-white w-32 h-8 rounded-full"
                >
                  Select Video
                </button>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
};

export default YoutubeUploader;
