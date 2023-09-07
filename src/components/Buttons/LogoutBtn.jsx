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
      className={` capitalize group w-full cursor-pointer flex-row-centered  hover:text-white h-8 tablet:h-10 gap-2   ${
        position === "navbar" ? "rounded-b-lg" : " text-white rounded-lg px-3"
      } ${
        isBlue
          ? "bg-primary hover:bg-purple-500 text-white "
          : "bg-slate-100 hover:bg-slate-900  "
      }`}
    >
      <span>Logout</span>
      <span>
        {logoutMutation?.isLoading ? (
          <SpinnerIcon />
        ) : (
          <ArrowRightOnRectangleIcon
            // className={`  ${
            //   position === "navbar"
            //     ? "text-black group-hover:text-white"
            //     : "text-white"
            // } icon-styling `}
            className={`icon-styling ${
              isBlue ? "text-white" : "text-black"
            } group-hover:text-white `}
          />
        )}
      </span>
    </button>
  );
};

export default LogoutBtn;
