import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const NavBgBtn = ({ to, text, isBlue = false }) => {
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem("roles"));
  let roleInformation = role;
  if (!role) {
    roleInformation = "EM-201";
  }
  if (text === "Login") {
    return (
      <Link
        to={to}
        state={{ background: location }}
        className={` rounded-full h-9 aspect-square cursor-pointer flex-row-centered ${
          isBlue
            ? "bg-primary hover:bg-purple-500"
            : "bg-slate-800 hover:bg-slate-900 text-white"
        } `}
      >
        <ArrowLeftOnRectangleIcon className="icon-styling text-white" />
      </Link>
    );
  } else if (text === "register") {
    return (
      <Link
        to={to}
        state={{ background: location, role: roleInformation }}
        className={`navbar-link group ${
          isBlue
            ? "bg-primary hover:bg-purple-500 "
            : "bg-slate-700 hover:bg-slate-900  "
        } text-white `}
      >
        {text}
      </Link>
    );
  } else {
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
  }
};

export default NavBgBtn;
