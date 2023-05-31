import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBgBtn = ({ to, text }) => {
  const location = useLocation();
  return (
    <Link to={to} state={{ background: location }}>
      <div
        className={`${
          text == "Log In" && "border-2 border-white"
        } navbar-link  `}
      >
        {text}
      </div>
    </Link>
  );
};

export default NavBgBtn;
