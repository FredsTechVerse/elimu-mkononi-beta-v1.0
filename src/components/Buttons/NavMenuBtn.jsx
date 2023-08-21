import React from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const NavMenuBtn = (props) => {
  return (
    <button
      className={`${
        props.position === "layout"
          ? "relative w-full mx-auto h-8 bg-slate-300"
          : "fixed z-50 top-0  right-2 h-[10vh] px-2"
      } laptop:hidden  ${
        props.isDark ? "text-slate-800" : "text-slate-900"
      } flex items-center justify-center uppercase gap-1 `}
      onClick={() => {
        props.toggleNavbar();
      }}
    >
      {props.isNavOpen ? "Close " : "Menu"}

      {props.isNavOpen ? (
        <XMarkIcon
          className={`icon-styling ${
            props.isDark ? "text-slate-800" : "text-slate-900"
          }`}
        />
      ) : (
        <Bars3BottomRightIcon
          className={`icon-styling ${
            props.isDark ? "text-slate-800" : "text-slate-900"
          }`}
        />
      )}
    </button>
  );
};

export default NavMenuBtn;
