import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <div
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "block"
      } text-xl  border-none  flex-col-centered px-2 tablet:hidden `}
    >
      <RiMenu3Fill />
    </div>
  );
};

export default MenuBtn;
