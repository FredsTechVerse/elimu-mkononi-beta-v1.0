import React from "react";

import { Link, useLocation } from "react-router-dom";
const NavigateBtn = ({ text, destination }) => {
  const location = useLocation();
  return (
    <Link to={destination} state={{ background: location }}>
      <div
        className={`
      capitalize flex-row-centered gap-1 text-white bg-primary w-32 rounded-full h-8  px-0.5 `}
      >
        {text}
      </div>
    </Link>
  );
};

export default NavigateBtn;
