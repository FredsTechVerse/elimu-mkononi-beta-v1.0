import React from "react";
import { NavBtn } from "../components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen uppercase flex-col-centered bg-slate-300 gap-4">
      <p className="uppercase text-slate-700 font-bold text-4xl">
        Page not found
      </p>
      <Link
        to="/"
        className="navbar-link bg-slate-700 hover:bg-slate-900 h-12 px-4  "
      >
        visit homepage
      </Link>
    </div>
  );
};

export default NotFound;
