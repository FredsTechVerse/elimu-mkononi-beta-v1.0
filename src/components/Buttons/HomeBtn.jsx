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
      className={`text-sm capitalize w-full h-12 laptop:w-28 laptop:h-8 mx-1 flex-row-centered px-4  laptop:rounded-full ${
        roles?.includes("EM-202") || roles?.includes("EM-203")
          ? "flex"
          : "hidden"
      }  ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "laptop:bg-slate-700 laptop:text-white hover:bg-slate-900 hover:text-white "
      } text-black`}
      onClick={() => {
        navigate(homeLocation());
      }}
    >
      Dashboard
    </button>
  );
};

export default HomeBtn;
