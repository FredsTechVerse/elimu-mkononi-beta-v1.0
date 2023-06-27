import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const HomeBtn = ({ isDark }) => {
  return (
    <Link to="/">
      <div
        className={`${
          isDark
            ? "text-slate-700 hover:border-slate-900 hover:text-slate-900"
            : "hover:border-white "
        } cursor-pointer rounded-full flex-row-centered hover:border-2  `}
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
