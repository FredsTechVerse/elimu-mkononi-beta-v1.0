import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
const NavBgBtn = ({ to, text, isBlue = false }) => {
  const location = useLocation();
  if (text === "Login") {
    return (
      <Link
        to={to}
        state={{ background: location }}
        className="rounded-full bg-slate-700 hover:bg-slate-900 group h-9 aspect-square flex-row-centered "
      >
        <ArrowLeftOnRectangleIcon className="icon-styling text-white" />
      </Link>
    );
  }
  return (
    <Link
      to={to}
      state={{ background: location }}
      className={`navbar-link group ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-700 hover:bg-slate-900  "
      } text-white   `}
    >
      {text}
    </Link>
  );
};

export default NavBgBtn;
