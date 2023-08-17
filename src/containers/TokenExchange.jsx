import React, { useEffect } from "react";
import axios from "../axios";
import { useNavigate, useLocation } from "react-router-dom";
import { handleError } from "../controllers";
import { useAlertBoxContext } from "../context/AlertBoxContext";
const TokenExchange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAlertBoxData } = useAlertBoxContext();
  const exchangeCodeForToken = async () => {
    try {
      const code = new URLSearchParams(location?.search).get("code");
      const previousLocation = localStorage.getItem("previousLocation");
      const chapterID = localStorage.getItem("chapterID");
      const lessonTotals = localStorage.getItem("lessonTotals");
      const background = localStorage.getItem("background");
      const response = await axios.post(`/oAuth/getToken`, { code: code });
      const {
        access_token: youtubeAccessToken,
        scope,
        token_type,
        expiry_date,
      } = response.data;
      if (youtubeAccessToken) {
        localStorage.setItem("youtubeAccessToken", youtubeAccessToken);

        navigate(previousLocation, {
          state: {
            background: background,
            chapterID: chapterID,
            lessonTotals: lessonTotals,
          },
        });
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
