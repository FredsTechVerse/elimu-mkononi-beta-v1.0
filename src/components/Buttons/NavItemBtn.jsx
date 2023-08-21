import React from "react";
import { Link } from "react-router-dom";

const NavItemBtn = (props) => {
  return (
    <Link
      className={`h-14 laptop:h-full w-full  ${
        props.isFixed && "laptop:w-36 laptop:text-white  laptop:rounded-full"
      } ${
        props.isLight ? "text-white " : "text-slate-800"
      } flex items-center justify-center capitalize hover:laptop:bg-white hover:bg-text hover:text-white hover:laptop:text-slate-800   `}
      to={props.to}
      onClick={() => {
        if (props.toggleNavbar) {
          props.toggleNavbar();
        }
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavItemBtn;
