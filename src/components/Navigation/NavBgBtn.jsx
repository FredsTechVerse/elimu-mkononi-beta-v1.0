import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
const NavBgBtn = ({ to, text }) => {
  const location = useLocation();
  return (
    <Link to={to} state={{ background: location }}>
      <div
        className={
          text == "Log In"
            ? "bg-white rounded-full h-8 aspect-square flex-row-centered "
            : text === "register"
            ? "navbar-link bg-white text-black  w-28"
            : "capitalize flex-row-centered gap-1 text-black bg-white rounded-full h-8 debug px-0.5 group"
        }
      >
        {text === "Log In" ? (
          <ArrowLeftOnRectangleIcon className="icon-styling text-black  " />
        ) : (
          text
        )}
      </div>
    </Link>
  );
};

export default NavBgBtn;
