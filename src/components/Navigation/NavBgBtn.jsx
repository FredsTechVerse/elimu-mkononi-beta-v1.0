import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
const NavBgBtn = ({ to, text }) => {
  const location = useLocation();
  if (text === "Login") {
    return (
      <Link to={to} state={{ background: location }}>
        <div
          className={
            "rounded-full bg-white group h-9 aspect-square flex-row-centered "
          }
        >
          <ArrowLeftOnRectangleIcon className="icon-styling text-slate-700" />
        </div>
      </Link>
    );
  }
  return (
    <Link to={to} state={{ background: location }}>
      <div className={"navbar-link  bg-white text-slate-700 group"}>
        {text === "Login" ? (
          <ArrowLeftOnRectangleIcon className="icon-styling text-black" />
        ) : (
          text
        )}
      </div>
    </Link>
  );
};

export default NavBgBtn;
