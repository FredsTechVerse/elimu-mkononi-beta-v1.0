import React, { useEffect } from "react";
import axios from "../axios";
import { useNavigate, useLocation } from "react-router-dom";
import { handleError } from "../controllers/handleErrors";
import { useAlertBoxContext } from "../context/AlertBoxContext";
const TokenExchange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAlertBoxData } = useAlertBoxContext();
  const exchangeCodeForToken = async () => {
    if (!location) {
      return;
    }
    const code = new URLSearchParams(location?.search).get("code");
    const previousLocation = localStorage.getItem("previousLocation");
    localStorage.removeItem("previousLocation");
    try {
      const response = await axios.post(`/oAuth/getToken`, { code: code });
      const youtubeAccessToken = response.data;
      if (youtubeAccessToken) {
        localStorage.setItem("youtubeAccessToken", youtubeAccessToken);

        navigate(previousLocation);
      }
    } catch (error) {
      handleError(error, updateAlertBoxData);
    }
  };

  useEffect(() => {
    exchangeCodeForToken();
  }, []);

  return <div></div>;
};

export default TokenExchange;
