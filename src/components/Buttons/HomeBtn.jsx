import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const HomeBtn = ({ isBlue = false, icon = false, position = "default" }) => {
  const roles = localStorage.getItem("roles");
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
      className={`transition-all duration-200 capitalize h-8 aspect-square  mx-1 flex-row-centered  text-white text-sm ${
        position === "dashboard" ? "w-full " : " w-max rounded-lg "
      }  ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-700 hover:bg-slate-900"
      }
      `}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      {icon ? <HomeIcon className="icon-styling h-5" /> : "home"}
    </button>
  );
};

export default HomeBtn;
