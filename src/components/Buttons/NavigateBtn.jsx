import React from "react";

import { Link, useLocation } from "react-router-dom";
const NavigateBtn = ({ text, destination, isRounded = true }) => {
  const location = useLocation();
  return (
    <Link
      to={destination}
      state={{ background: location }}
      className={`
      capitalize flex-row-centered gap-1 text-white bg-primary w-32 ${
        isRounded ? "rounded-full" : "rounded-sm"
      } h-8  px-0.5 `}
    >
      {text}
    </Link>
  );
};

export default NavigateBtn;
