import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const roles = JSON.parse(localStorage.getItem("roles"));

const HomeBtn = ({ isDark = false, icon = false, position = "default" }) => {
  const navigate = useNavigate();
  const homeLocation = () => {
    if (roles?.includes("EM-202")) {
      return "/tutor";
    } else if (roles?.includes("EM-203")) {
      return "/admin";
    } else {
      return "/";
    }
  };
  return (
    <button
      className={`text-sm capitalize ${
        position === "dashboard" &&
        " h-10 aspect-square  w-max bg-slate-700 hover:bg-slate-900 "
      } mx-1 flex-row-centered text-white rounded-lg  ${
        roles?.includes("EM-202") || roles?.includes("EM-203")
          ? "flex"
          : "hidden"
      }  text-black capitalize`}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      {icon ? (
        <HomeIcon className="icon-styling h-5 text-white" />
      ) : (
        "dashboard"
      )}
    </button>
  );
};

export default HomeBtn;
