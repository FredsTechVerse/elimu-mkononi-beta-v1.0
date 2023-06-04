import React from "react";
import { Link } from "react-router-dom";
const UnitNav = () => {
  return (
    <div className="navigation flex flex-row w-full justify-start gap-10 items-center px-4 text-dark py-3 mb-3 text-sm text-white bg-primary rounded-lg ">
      <div className="flex tablet:hidden">
        <Link to="nav">
          <div className="tab cursor-pointer group">
            <div className="capitalize">Navigation</div>
            <div className=" line h-1 rounded-md bg-slate-200  w-4 group-hover:w-full transition-all  "></div>
          </div>
        </Link>
      </div>
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
  );
};
export default UnitNav;
