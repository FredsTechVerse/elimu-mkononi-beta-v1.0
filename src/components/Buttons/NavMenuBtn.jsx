import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const NavMenuBtn = ({ isNavOpen, position, toggleNavbar, isBlue = false }) => {
  return (
    <button
      className={` text-white flex items-center justify-center capitalize gap-1  px-2  rounded-lg h-10 ${
        position === "layout" && "relative w-full laptop:hidden"
      }  ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-700 hover:bg-slate-900  "
      } `}
      onClick={() => {
        toggleNavbar();
      }}
    >
      {isNavOpen ? "Close " : "Menu"}

      {isNavOpen ? (
        <XMarkIcon className={`icon-styling text-white  `} />
      ) : (
        <Bars3Icon className={`icon-styling text-white `} />
      )}
    </button>
  );
};

export default NavMenuBtn;
