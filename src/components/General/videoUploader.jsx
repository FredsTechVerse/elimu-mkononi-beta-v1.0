import React from "react";
const axios = require("axios");

// Configuration
const accessToken = "YOUR_ACCESS_TOKEN";
const videoTitle = "My Video Title";
const videoDescription = "My Video Description";
const videoFile = "/path/to/video/file.mp4";
const videoTags = ["tag1", "tag2", "tag3"];
// Video metadata
const videoMetadata = {
  snippet: {
    title: videoTitle,
    description: videoDescription,
    tags: videoTags,
  },
  status: {
    privacyStatus: "private", // Set the privacy status as desired
  },
};

// Video upload function
async function uploadVideo() {
  try {
    // Step 1: Initialize the video upload
    const initUploadResponse = await axios.post(
      "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status",
      videoMetadata,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Step 2: Upload video content
    const videoUrl = initUploadResponse.data.uploadLocation;
    const videoData = await axios.put(videoUrl, videoFile, {
      headers: {
        "Content-Type": "video/*",
      },
    });

    console.log("Video uploaded successfully!");
    console.log("Video ID:", initUploadResponse.data.id);
  } catch (error) {
    console.error("Error uploading video:", error.message);
  }
}

// Call the upload function
uploadVideo();

const videoUploader = () => {
  return <div>videoUploader</div>;
};

export default videoUploader;
