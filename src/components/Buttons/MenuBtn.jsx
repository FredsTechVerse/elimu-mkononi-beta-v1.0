import React from "react";

import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <button
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "flex"
      } text-xl  flex-col-centered px-2 laptop:hidden border-none group bg-slate-600 hover:bg-slate-900  aspect-square h-9 rounded-full `}
    >
      <Bars3BottomRightIcon className="icon-styling text-white" />
    </button>
  );
};

export default MenuBtn;
