import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const roles = JSON.parse(localStorage.getItem("roles"));
const HomeBtn = ({ isBlue = false, icon = false, position = "default" }) => {
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
      className={`transition-all  duration-200 text-sm capitalize h-10 rounded-lg mx-1 flex-row-centered  ${
        position === "dashboard"
          ? "  aspect-square  w-max  px-2 text-white "
          : "w-full hover:bg-slate-900 text-slate-900 hover:text-white rounded-none"
      }  ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-100 hover:bg-slate-900  "
      }
      ${
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
