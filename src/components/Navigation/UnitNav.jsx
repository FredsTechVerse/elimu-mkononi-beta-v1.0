import React from "react";

import { Link } from "react-router-dom";
import { BackBtn } from "../../components";
const UnitNav = ({ lessonName }) => {
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-3  h-14 rounded-t-lg ">
      <BackBtn />
      <div className="text-lg font-bold ">{lessonName}</div>
      <div className="flex gap-8 ">
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
    </div>
  );
};
export default UnitNav;
