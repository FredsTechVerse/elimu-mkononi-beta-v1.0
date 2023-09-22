import React from "react";

import { Link } from "react-router-dom";
const NavBtn = ({ to, text, isBlue = false }) => {
  return (
    <Link
      to={to}
      className={`navbar-link h-8 rounded-lg group ${
        isBlue
          ? "bg-primary hover:bg-purple-500"
          : "bg-slate-700 hover:bg-slate-900  "
      } text-white `}
    >
      {text}
    </Link>
  );
};

export default NavBtn;
