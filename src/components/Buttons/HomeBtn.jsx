import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const HomeBtn = ({ isDark, inDashboard }) => {
  return (
    <Link to="/">
      <div
        className={`${isDark && "text-slate-700 hover:text-slate-900"} ${
          inDashboard && "bg-primary hover:bg-purple-500"
        } cursor-pointer rounded-full flex-row-centered border-none  `}
        onClick={() => {
          navigate(-1);
        }}
      >
        <HomeIcon
          className={`${
            isDark ? "text-slate-700" : "text-white"
          } h-5 w-5 m-1.5`}
        />
      </div>
    </Link>
  );
};

export default HomeBtn;
