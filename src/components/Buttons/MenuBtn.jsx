import React from "react";

import { Bars3Icon } from "@heroicons/react/24/solid";

const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <button
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "flex"
      } flex-row-centered gap-1 capitalize laptop:hidden border-none group bg-slate-700 hover:bg-slate-800 h-8 tablet:h-10 px-2 rounded-lg text-white `}
    >
      <span>Menu</span>
      <Bars3Icon className="icon-styling text-white" />
    </button>
  );
};

export default MenuBtn;
