import React from "react";

import { Link } from "react-router-dom";
import { BackBtn } from "../../components";
import { ClipboardIcon, DocumentIcon } from "@heroicons/react/24/solid";
const UnitNav = () => {
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-3  h-14 rounded-t-lg ">
      <BackBtn />
      <div className="flex gap-1 ">
        <Link to="">
          <ClipboardIcon className="icon-styling text-slate-200" />
        </Link>

        <Link to="resources">
          <DocumentIcon className="icon-styling text-slate-200" />
        </Link>
      </div>
    </div>
  );
};
export default UnitNav;
