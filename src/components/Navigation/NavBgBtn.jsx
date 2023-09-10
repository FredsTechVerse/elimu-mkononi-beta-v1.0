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
        className={` transition-all  duration-200 capitalize group w-full h-8 laptop:h-10 cursor-pointer flex-row-centered gap-2  ${
          isBlue
            ? "bg-primary hover:bg-purple-500 text-white"
            : "hover:rounded-b-lg  bg-slate-700 hover:bg-slate-900 text-white  "
        } `}
      >
        <span>Login</span>
        <ArrowLeftOnRectangleIcon className={`icon-styling text-white `} />
      </Link>
    );
  } else if (text === "register") {
    return (
      <Link
        to={to}
        state={{ background: location, role: roleInformation }}
        className={` capitalize group w-full h-8 tablet:h-10  cursor-pointer flex-row-centered rounded-t-lg ${
          isBlue
            ? "bg-primary hover:bg-purple-500 text-white"
            : "bg-slate-700 hover:bg-slate-900 text-white "
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
        className={`navbar-link h-8 laptop:h-10 group ${
          isBlue
            ? "bg-primary hover:bg-purple-500 text-white"
            : "bg-slate-700 hover:bg-slate-900  "
        } text-white `}
      >
        {text}
      </Link>
    );
  }
};

export default NavBgBtn;
