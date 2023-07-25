import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { logoutUser } from "../../controllers/postData";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError } from "../../controllers/handleErrors";
import { useMutation } from "@tanstack/react-query";
import axios from "../../axios";

import { SpinnerIcon } from "../../components";
const LogoutBtn = ({ position = "sidebar", isSubmitting = true }) => {
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
    <div
      onClick={() => {
        logoutMutation.mutate();
      }}
      className={`${
        position === "navbar"
          ? "border-2 border-white  navbar-link"
          : "border-white rounded-full h-9 aspect-square bg-white hover:bg-border-2 cursor-pointer flex-row-centered"
      }`}
    >
      {position === "navbar" ? (
        <div className="flex flex-row items-center justify-center w-full gap-3 text-md ">
          <span>Log Out</span>
          {logoutMutation?.isLoading && <SpinnerIcon />}
        </div>
      ) : (
        <span>
          {logoutMutation?.isLoading ? (
            <SpinnerIcon />
          ) : (
            <ArrowRightOnRectangleIcon className="icon-styling  text-slate-900  " />
          )}
        </span>
      )}
    </div>
  );
};

export default LogoutBtn;
