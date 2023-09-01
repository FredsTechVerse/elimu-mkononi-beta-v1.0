import axios, { youtubeInstance } from "../axios";

const getYoutubeAuthorizationURI = async () => {
  const { data: authorizationUri } = await axios.get("/oAuth/authorizationUri");
  return authorizationUri;
};

const refreshYoutubeToken = async () => {
  try {
    const refreshToken = localStorage.getItem("youtubeRefreshToken");
    const config = {
      headers: { "Content-Type": "application/json" },
      data: { refreshToken: refreshToken },
    };
    const { data } = await axios.post(
      "oAuth/refreshToken",
      { refreshToken },
      config
    );

    const { accessToken, expiresIn } = data;
    localStorage.setItem("youtubeRefreshToken", accessToken);
    localStorage.setItem("youtubeAccessTokenExpiryDate", expiresIn);
    return { accessToken, expiresIn };
  } catch (err) {
    console.log(
      `Error while refreshing youtube access token ${JSON.stringify(err)}`
    );
  }
};

const redirectToExternalLink = ({ data: externalLink, lessonState }) => {
  localStorage.setItem("previousLocation", lessonState?.pathname);
  localStorage.setItem("chapterID", lessonState?.chapterID);
  localStorage.setItem("lessonTotals", lessonState?.lessonTotals);
  localStorage.setItem("background", lessonState?.background?.pathname);
  window.open(externalLink, "_self");
};

const fetchPresignedUrl = async ({ videoUploadUrl, metadata, headers }) => {
  const response = await youtubeInstance.post(videoUploadUrl, metadata, {
    headers: headers,
    params: {
      uploadType: "resumable",
      part: "snippet,status",
    },
  });
  const presignedUrl = response.headers.location;
  return presignedUrl;
};

const uploadVideoToYoutube = async ({
  presignedUrl,
  videoFile,
  videoType,
  trackUploadProgress,
}) => {
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
  return videoUrl;
};

export {
  getYoutubeAuthorizationURI,
  refreshYoutubeToken,
  redirectToExternalLink,
  fetchPresignedUrl,
  uploadVideoToYoutube,
};
