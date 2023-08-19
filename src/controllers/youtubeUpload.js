import { youtubeInstance } from "../axios";

const redirectToExternalLink = ({ data: externalLink, lessonState }) => {
  localStorage.setItem("previousLocation", lessonState?.pathname);
  localStorage.setItem("chapterID", lessonState?.chapterID);
  localStorage.setItem("lessonTotals", lessonState?.lessonTotals);
  localStorage.setItem("background", lessonState?.background?.pathname);
  window.open(externalLink, "_self");
};

const fetchPresignedUrl = async ({ videoUploadUrl, metadata, headers }) => {
  console.log({ videoUploadUrl, metadata, headers });
  const response = await youtubeInstance.post(videoUploadUrl, metadata, {
    headers: headers,
    params: {
      uploadType: "resumable",
      part: "snippet,status",
    },
  });
  const presignedUrl = response.headers.location;
  console.log({ presignedUrl });
  return presignedUrl;
};

const uploadVideoToYoutube = async ({
  presignedUrl,
  videoFile,
  videoType,
  trackUploadProgress,
}) => {
  console.log({
    presignedUrl,
    videoFile,
    videoType,
    trackUploadProgress,
  });
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
  console.log({ videoUrl });
  return videoUrl;
};

export { redirectToExternalLink, fetchPresignedUrl, uploadVideoToYoutube };
