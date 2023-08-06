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
      console.log("Location not found");
      return;
    }
    try {
      const code = new URLSearchParams(location?.search).get("code");
      console.log(`Code generated : ${JSON.stringify(code)}`);
      const previousLocation = localStorage.getItem("previousLocation");
      const response = await axios.post(`/oAuth/getToken`, { code: code });
      const {
        access_token: youtubeAccessToken,
        scope,
        token_type,
        expiry_date,
      } = response.data;
      if (youtubeAccessToken) {
        console.log({ youtubeAccessToken, scope, token_type, expiry_date });
        localStorage.setItem("youtubeAccessToken", youtubeAccessToken);
        console.log(`Previous location ${JSON.stringify(previousLocation)}`);
        navigate(previousLocation);
      }
    } catch (error) {
      handleError(error, updateAlertBoxData);
    }
  };

  useEffect(() => {
    exchangeCodeForToken();
  }, []);
};

export default TokenExchange;
