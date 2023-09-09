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
      className={`transition-all  duration-200 text-sm capitalize h-8 tablet:h-10 w-max aspect-square  mx-1 flex-row-centered rounded-lg ${
        position === "dashboard" &&
        "w-full hover:bg-slate-900 text-slate-900 hover:text-white "
      }  ${isBlue && "bg-primary hover:bg-purple-500 "}
      ${
        (roles?.includes("EM-202") || roles?.includes("EM-203")) &&
        !icon &&
        "hidden"
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
