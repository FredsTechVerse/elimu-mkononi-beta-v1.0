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
        className={` group w-full h-12 laptop:rounded-full laptop:w-12 laptop:aspect-square cursor-pointer flex-row-centered gap-2  ${
          isBlue
            ? "bg-primary hover:bg-purple-500"
            : "laptop:bg-slate-700 laptop:text-white hover:bg-slate-900 hover:text-white "
        } `}
      >
        <span className="laptop:hidden">Login</span>

        <ArrowLeftOnRectangleIcon
          className={`icon-styling text-black group-hover:text-white laptop:text-white`}
        />
      </Link>
    );
  } else if (text === "register") {
    return (
      <Link
        to={to}
        state={{ background: location, role: roleInformation }}
        className={`text-sm capitalize w-full h-12 laptop:w-28 laptop:h-8 mx-1 flex-row-centered px-4  laptop:rounded-full   ${
          isBlue
            ? "bg-primary hover:bg-purple-500"
            : "laptop:bg-slate-700 laptop:text-white hover:bg-slate-900 hover:text-white "
        } text-black`}
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
