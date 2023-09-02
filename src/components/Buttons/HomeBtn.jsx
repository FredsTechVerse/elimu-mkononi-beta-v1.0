import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const roles = JSON.parse(localStorage.getItem("roles"));

const HomeBtn = ({ isBlue = false, icon = false }) => {
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
      className={`text-sm capitalize w-max h-12  laptop:h-8 mx-1 flex-row-centered px-4  laptop:rounded-full ${
        roles?.includes("EM-202") || roles?.includes("EM-203")
          ? "flex"
          : "hidden"
      }  ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "laptop:bg-slate-700 laptop:text-white hover:bg-slate-900 hover:text-white "
      } text-black capitalize`}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      {icon ? (
        <HomeIcon className="icon-styling h-3 laptop:h-4 text-white" />
      ) : (
        "dashboard"
      )}
    </button>
  );
};

export default HomeBtn;
