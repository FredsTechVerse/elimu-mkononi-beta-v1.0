import React from "react";

import { Link } from "react-router-dom";
import { MenuBtn, HomeBtn } from "../../components";
const UnitNav = ({ openSideBar, sideBarOpen, lessonName }) => {
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark py-3 mb-3 text-sm text-white bg-primary px-3 mt-1 rounded-t-lg ">
      <HomeBtn />
      <div className="text-lg font-bold ">{lessonName}</div>
      <div className="flex gap-8">
        <Link to="">
          <div className="tab cursor-pointer group">
            <div className="capitalize">Notes</div>
            <div className=" line h-1 rounded-md bg-slate-200  w-4 group-hover:w-full transition-all  "></div>
          </div>
        </Link>

        <Link to="resources">
          <div className="tab cursor-pointer group">
            <div className="capitalize">Resources</div>
            <div className="line h-1 rounded-md bg-slate-200  w-4 group-hover:w-full transition-all  "></div>
          </div>
        </Link>
      </div>
      <MenuBtn openSideBar={openSideBar} sideBarOpen={sideBarOpen} />
    </div>
  );
};
export default UnitNav;
