import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { logoutUser } from "../../controllers/postData";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError } from "../../controllers/handleErrors";
import { useMutation } from "@tanstack/react-query";
import axios from "../../axios";

import { SpinnerIcon } from "../../components";
const LogoutBtn = ({ isBlue = false }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("roles");
      localStorage.removeItem("youtubeAccessToken");
      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "/";
      updateAlertBoxData({
        response: "Logged out successfully",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createCourseMutation.mutate({
          courseTitle: courseTitle,
          courseImage: fileName,
        });
      }
    },
  });
  return (
    <button
      onClick={() => {
        logoutMutation.mutate();
      }}
      className={` rounded-full h-9 aspect-square cursor-pointer flex-row-centered ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "bg-slate-800 hover:bg-slate-900 text-white"
      } `}
    >
      <span>
        {logoutMutation?.isLoading ? (
          <SpinnerIcon />
        ) : (
          <ArrowRightOnRectangleIcon className={`icon-styling text-white`} />
        )}
      </span>
    </button>
  );
};

export default LogoutBtn;
