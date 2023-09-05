import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError, logoutUser } from "../../controllers";
import { useMutation } from "@tanstack/react-query";
import axios from "../../axios";

import { SpinnerIcon } from "../../components";
const LogoutBtn = ({ isBlue = false, position = "default" }) => {
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
        timeout: 4500,
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
      className={` capitalize group w-full cursor-pointer flex-row-centered hover:bg-slate-900 hover:text-white h-10 gap-2   ${
        position === "navbar"
          ? "hover:rounded-b-lg"
          : "bg-slate-700 text-white rounded-lg px-3"
      } `}
    >
      <span>Logout</span>
      <span>
        {logoutMutation?.isLoading ? (
          <SpinnerIcon />
        ) : (
          <ArrowRightOnRectangleIcon
            className={`  ${
              position === "navbar"
                ? "text-black group-hover:text-white"
                : "text-white"
            } icon-styling `}
          />
        )}
      </span>
    </button>
  );
};

export default LogoutBtn;
