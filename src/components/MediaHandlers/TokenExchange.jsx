import React, { useEffect } from "react";
import axios from "axios";

const TokenExchange = ({ location }) => {
  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = new URLSearchParams(location.search).get("code");
      const redirectUri = encodeURIComponent(process.env.REDIRECT_URI); // Your redirect URI
      const clientId = process.env.CLIENT_ID;
      const clientSecret = process.env.CLIENT_SECRET;
      try {
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          }
        );
        const { access_token: youtubeAccessToken } = response.data;
        localStorage.setItem("youtubeAccessToken", youtubeAccessToken);
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
      }
    };

    exchangeCodeForToken();
  }, []);

  return <div>Exchanging code for access token...</div>;
};

export default TokenExchange;
