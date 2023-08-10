import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const roles = JSON.parse(localStorage.getItem("roles"));

const HomeBtn = ({ isDark, inDashboard }) => {
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
      className={`${isDark && "text-slate-700 hover:text-slate-900"} ${
        inDashboard && "bg-primary hover:bg-purple-500"
      } cursor-pointer rounded-full flex-row-centered border-none  `}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      <HomeIcon
        className={`${isDark ? "text-slate-700" : "text-white"} h-5 w-5 m-1.5`}
      />
    </button>
  );
};

export default HomeBtn;
