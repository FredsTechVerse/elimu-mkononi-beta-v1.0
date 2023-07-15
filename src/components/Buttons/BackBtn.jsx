import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const BackBtn = ({ isDark }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isDark
          ? "text-slate-700 hover:border-slate-900 hover:text-slate-900"
          : "hover:border-white"
      } cursor-pointer rounded-full flex-row-centered hover:border-2  `}
      onClick={() => {
        console.log("Back btn clicked");
        navigate(-1);
      }}
    >
      <ArrowLeftIcon
        className={`${isDark ? "text-slate-700" : "text-white"} h-5 w-5 m-1.5`}
      />
    </div>
  );
};
1;

export default BackBtn;
