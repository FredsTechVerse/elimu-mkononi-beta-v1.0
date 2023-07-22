import React from "react";

import { Link } from "react-router-dom";
const NavBtn = ({ to, text }) => {
  return (
    <Link to={to}>
      <div className="navbar-link bg-white text-black ">{text}</div>
    </Link>
  );
};

export default NavBtn;
