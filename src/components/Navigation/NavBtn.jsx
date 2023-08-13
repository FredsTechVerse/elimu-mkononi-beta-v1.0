import React from "react";

import { Link } from "react-router-dom";
const NavBtn = ({ to, text }) => {
  return (
    <Link to={to} className="navbar-link bg-white text-black ">
      {text}
    </Link>
  );
};

export default NavBtn;
