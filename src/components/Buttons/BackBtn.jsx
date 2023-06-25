import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-full flex-row-centered hover:border-2 hover:border-white  "
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeftIcon className="h-5 w-5 m-1.5 text-white" />
    </div>
  );
};
1;

export default BackBtn;
