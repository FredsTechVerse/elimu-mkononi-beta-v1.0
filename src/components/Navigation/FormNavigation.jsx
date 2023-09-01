import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { useNavigate, useLocation } from "react-router-dom";
const FormNavigation = ({ text }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { background } = location.state;
  return (
    <div className=" relative w-full flex justify-center items-center text-lg font-bold text-white uppercase  px-2 py-5  rounded-t-2xl ">
      {text}
      <button
        className="absolute top-4.5 right-3"
        onClick={() => navigate(background)}
      >
        <XCircleIcon className="icon-styling text-slate-800 " />
      </button>
    </div>
  );
};

export default FormNavigation;
