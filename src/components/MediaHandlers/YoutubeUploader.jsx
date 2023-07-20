import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { youtubeInstance } from "../../axios";
import { CircularProgressBar } from "../../components";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { getYoutubeAuthorizationURI } from "../../controllers/fetchData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const YoutubeUploader = ({ verifyUpload, updateFileInfo, videoTitle }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const [percentCompleted, setPercentCompleted] = useState(0);
  const videoUploadUrl = import.meta.env.VITE_VIDEO_UPLOAD_LINK;
  const videoDescription = "Youtube is the new red university!";
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

  const youtubeAccessTokenQuery = useQuery(
    ["authorizationURI"],
    getYoutubeAuthorizationURI,
    {
      retry: 1,
      onSuccess: (data) => {
        console.log(
          `Redirecting to the authorrization URI ${JSON.stringify(data)}`
        );
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
    localStorage.setItem("previousLocation", window.location.pathname);
    window.open(externalLink, "_self");
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const videoFile = acceptedFiles[0];
      const { type: videoType } = videoFile;
      const accessToken = localStorage.getItem("youtubeAccessToken");
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
      const { id: videoID, kind: videoKind } = videoData;
      console.log(`The video id of the uploaded video ${videoID}`);
      const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;
      updateFileInfo({ videoUrl, videoKind });
    } catch (error) {
      console.log(error);
      handleError(error, updateAlertBoxData);
    }
  };
  return (
    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg ">
      {youtubeAccessTokenQuery.status === "loading" ? (
        <p>Fetching the access token b4 we can proceed</p>
      ) : (
        <div className="w-full">
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
      )}
    </div>
  );
};

export default YoutubeUploader;
