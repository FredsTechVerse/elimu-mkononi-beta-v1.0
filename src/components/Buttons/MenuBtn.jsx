import React from "react";

import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <button
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "flex"
      } flex-row-centered gap-1 capitalize laptop:hidden border-none group bg-slate-700 hover:bg-slate-800 h-10 px-2 rounded-lg text-white `}
    >
      <span>Menu</span>
      <Bars3BottomRightIcon className="icon-styling text-white" />
    </button>
  );
};

export default MenuBtn;
