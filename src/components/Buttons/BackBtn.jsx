import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const BackBtn = ({ isDark, isBlue = false }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${
        isDark && "text-slate-700 hover:text-white hover:bg-slate-700 "
      }  ${
        isBlue && "bg-primary hover:bg-purple-500 "
      } cursor-pointer rounded-full  flex-row-centered hover:bg-white  group `}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeftIcon
        className={`${
          isDark ? "text-slate-700 group-hover:text-white" : "text-white"
        }  h-5 w-5 m-1.5`}
      />
    </button>
  );
};
1;

export default BackBtn;
