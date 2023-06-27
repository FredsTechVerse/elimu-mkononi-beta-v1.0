import React from "react";

import { useNavigate } from "react-router-dom";
const ReturnBackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="w-36 bg-primary py-2 rounded-sm text-white my-4"
      onClick={() => {
        navigate(-1);
      }}
    >
      Return Home
    </button>
  );
};

export default ReturnBackBtn;
