import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const NavMenuBtn = ({ isNavOpen, position, toggleNavbar }) => {
  return (
    <button
      className={`${
        position === "layout"
          ? "relative w-full mx-auto h-10 px-2 bg-slate-700 text-white hover:bg-slate-900 rounded-lg laptop:hidden"
          : "fixed z-50 top-0  h-[8vh] right-2  px-2"
      } text-slate-800 flex items-center justify-center uppercase gap-1 `}
      onClick={() => {
        toggleNavbar();
      }}
    >
      {isNavOpen ? "Close " : "Menu"}

      {isNavOpen ? (
        <XMarkIcon
          className={`icon-styling ${
            position === "layout" ? "text-white" : "text-slate-800"
          }  `}
        />
      ) : (
        <Bars3Icon
          className={`icon-styling ${
            position === "layout" ? "text-white" : "text-slate-800"
          }  `}
        />
      )}
    </button>
  );
};

export default NavMenuBtn;
