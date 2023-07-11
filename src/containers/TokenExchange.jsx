import React, { useEffect } from "react";
import axios from "../axios";
import { useNavigate, useLocation } from "react-router-dom";
const TokenExchange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = new URLSearchParams(location.search).get("code");
      const previousLocation = localStorage.getItem("previousLocation");
      localStorage.removeItem("previousLocation");
      try {
        const response = await axios.post(`/oAuth/getToken`, { code: code });
        const youtubeAccessToken = response.data;
        if (youtubeAccessToken) {
          localStorage.setItem("youtubeAccessToken", youtubeAccessToken);
          console.log(`Youtube Access Token ${youtubeAccessToken}`);
          navigate(previousLocation);
        }
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
      }
    };

    exchangeCodeForToken();
  }, []);

  return <div>Exchanging code for access token...</div>;
};

export default TokenExchange;
