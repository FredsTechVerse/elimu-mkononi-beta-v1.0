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
          text === "Login"
            ? "navbar-link bg-white "
            : text === "register"
            ? "navbar-link bg-white"
            : "navbar-link  group"
        }
      >
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
