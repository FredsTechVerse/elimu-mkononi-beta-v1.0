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
  if (text === "login") {
    return (
      <Link
        to={to}
        state={{ background: location }}
        className={` transition-all  duration-200 capitalize group w-full h-10  cursor-pointer flex-row-centered gap-2  ${
          isBlue
            ? "bg-primary hover:bg-purple-500"
            : "hover:rounded-b-lg  hover:bg-slate-900 hover:text-white "
        } `}
      >
        <span>Login</span>
        <ArrowLeftOnRectangleIcon
          className={`icon-styling text-black group-hover:text-white `}
        />
      </Link>
    );
  } else if (text === "register") {
    return (
      <Link
        to={to}
        state={{ background: location, role: roleInformation }}
        className={` capitalize group w-full h-10  cursor-pointer flex-row-centered   ${
          isBlue
            ? "bg-primary hover:bg-purple-500"
            : "hover:rounded-t-lg  hover:bg-slate-900 hover:text-white "
        } `}
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
