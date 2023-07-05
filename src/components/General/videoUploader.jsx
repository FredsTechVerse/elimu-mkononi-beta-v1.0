import React from "react";
import axios from "axios";

const uploadVideo = async (accessToken, videoFile, title, description) => {
  try {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;
    const videoUploadUrl =
      "https://www.googleapis.com/upload/youtube/v3/videos";

    const videoUploadHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const fetchAccessToken = async () => {
      const { code: accessTokenCode } = req.query;
      const { data: accessToken } = await axios.post(tokenEndpoint, {
        code: accessTokenCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });
      return accessToken;
    };

    const metadata = {
      snippet: {
        title: title,
        description: description,
      },
      status: {
        privacyStatus: "private",
      },
    };

    // Fetches the access token code.
    const { data: authorizationUrl } = await axios.get(
      "http://localhost:5000/elearning-module-a887d/us-central1/app/oAuth/authorizationUrl"
    );
    console.log(`Authorization Url ${authorizationUrl}`);
    // We auto redirect to the authorization page where we get some authorization code which we can exchange for
    // an access token via :

    const accessToken = fetchAccessToken();

    const response = await axios.post(videoUploadUrl, metadata, {
      headers: videoUploadHeaders,
      params: {
        uploadType: "resumable",
        part: "snippet,status",
      },
    });

    // Get the location header from the response
    const location = response.headers.location;

    // Upload the video file using a PUT request
    await axios.put(location, videoFile, {
      headers: {
        "Content-Type": videoFile.type,
      },
    });

    console.log("Video uploaded successfully");
    // Handle success and display a success message to the user
  } catch (error) {
    console.error("Error uploading video:", error);
    // Handle error and display an error message to the user
  }
};

// Example usage:
const accessToken = "<access_token>";
const videoFile = document.getElementById("video-file").files[0];
const title = "My Video Title";
const description = "My Video Description";

uploadVideo(accessToken, videoFile, title, description);

const videoUploader = () => {
  return <div>videoUploader</div>;
};

export default videoUploader;
