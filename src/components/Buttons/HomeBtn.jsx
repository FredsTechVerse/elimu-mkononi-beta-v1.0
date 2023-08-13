import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const roles = JSON.parse(localStorage.getItem("roles"));

const HomeBtn = ({ isBlue = false }) => {
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
      className={` rounded-full h-9 aspect-square cursor-pointer flex-row-centered ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "bg-slate-800 hover:bg-slate-900 text-white"
      } `}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      <HomeIcon className="icon-styling h-5 aspect-square text-white" />
    </button>
  );
};

export default HomeBtn;
