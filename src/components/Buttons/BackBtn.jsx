import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const BackBtn = ({ isDark, inDashboard = false }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${isDark && "text-slate-700 hover:text-slate-900 "}  ${
        inDashboard && "bg-primary hover:bg-purple-500 "
      } cursor-pointer rounded-full flex-row-centered hover:bg-white  group  `}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeftIcon
        className={`${
          isDark ? "text-slate-700" : "text-white"
        } group-hover:text-slate-700 h-5 w-5 m-1.5`}
      />
    </div>
  );
};
1;

export default BackBtn;
