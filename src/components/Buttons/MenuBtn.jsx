import React from "react";

import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <div
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "flex"
      } text-xl  flex-col-centered px-2 laptop:hidden border-2 border-white hover:bg-white aspect-square h-9 rounded-full `}
    >
      <Bars3BottomRightIcon className="icon-styling text-white" />
    </div>
  );
};

export default MenuBtn;
