import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { youtubeInstance } from "../../axios";
import { CircularProgressBar } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { getYoutubeAuthorizationURI, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const YoutubeUploader = ({ updateFileInfo, videoTitle, lessonState }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("youtubeAccessToken");
  const videoUploadUrl = import.meta.env.VITE_VIDEO_UPLOAD_LINK;
  const videoDescription = "Youtube is the new red university!";
  const trackUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setPercentCompleted(percentCompleted);
    if (percentCompleted == 100) {
      setPercentCompleted(0);
    }
  };

  const youtubeAccessTokenQuery = useQuery(
    ["authorizationURI"],
    getYoutubeAuthorizationURI,
    {
      enabled: isQueryEnabled, // Control when the query should run
      staleTime: 3600 * 1000,
      retry: 1,
      onSuccess: (data) => {
        redirectToExternalLink(data);
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["authorizationURI"]);
        }
      },
    }
  );

  const redirectToExternalLink = (externalLink) => {
    localStorage.setItem("previousLocation", lessonState?.pathname);
    localStorage.setItem("chapterID", lessonState?.chapterID);
    localStorage.setItem("lessonTotals", lessonState?.lessonTotals);
    localStorage.setItem("background", lessonState?.background?.pathname);
    window.open(externalLink, "_self");
  };

  const handleDrop = async (acceptedFiles) => {
    try {
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
          privacyStatus: "unlisted",
        },
      };

      const response = await youtubeInstance.post(videoUploadUrl, metadata, {
        headers: headers,
        params: {
          uploadType: "resumable",
          part: "snippet,status",
        },
      });
      const presignedUrl = response.headers.location;
      const { data: videoData } = await youtubeInstance.put(
        presignedUrl,
        videoFile,
        {
          headers: {
            "Content-Type": videoType,
          },
          onUploadProgress: trackUploadProgress,
        }
      );
      const { id: videoID } = videoData;

      const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

      updateFileInfo({ videoUrl });
    } catch (error) {
      console.error(error);
      handleError(error, updateAlertBoxData);
    }
  };
  useEffect(() => {
    setIsQueryEnabled(!accessToken);
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-300  bg-opacity-60 rounded-lg flex-col-centered">
        {youtubeAccessTokenQuery.status === "loading" && (
          <p className="text-center">Fetching the access token...</p>
        )}
      </div>
    );
  }

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
    </div>
  );
};

export default YoutubeUploader;
