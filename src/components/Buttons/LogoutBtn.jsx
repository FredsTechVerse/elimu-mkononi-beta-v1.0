import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError, logoutUser } from "../../controllers";
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
      className={`  w-full h-12 tablet:h-9 tablet:rounded-full tablet:w-9 tablet:aspect-square cursor-pointer flex-row-centered gap-2  ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "tablet:bg-slate-700 tablet:text-white hover:bg-slate-900 hover:text-white "
      } `}
    >
      <span>
        {logoutMutation?.isLoading ? (
          <SpinnerIcon />
        ) : (
          <ArrowRightOnRectangleIcon
            className={`icon-styling text-black tablet:text-white`}
          />
        )}
      </span>
      <span className="tablet:hidden">Logout</span>
    </button>
  );
};

export default LogoutBtn;
