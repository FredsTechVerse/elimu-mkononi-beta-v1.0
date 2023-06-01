import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
// I have the freedom to append props directly to icons.
const NavigateBtn = ({ text, destination }) => {
  const location = useLocation();
  return (
    <Link to={destination} state={{ background: location }}>
      <div
        className={`
      capitalize flex-row-centered gap-1 text-secondary bg-primary w-32 rounded-md h-10 shadow-sm shadow-slate-200 px-0.5 `}
      >
        {text}
        <span className="text-secondary text-lg">
          <IoMdAdd />
        </span>
      </div>
    </Link>
  );
};

export default NavigateBtn;
