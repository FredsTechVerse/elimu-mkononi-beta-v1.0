import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
const AdminNavItem = ({ text }) => {
  return (
    <Link to={text}>
      <button className="group h-12 w-full pointer-cursor hover:bg-purple-400 flex justify-between items-center px-4 text-white rounded-lg bg-primary rounded-ms capitalize">
        view {text}
        <span className="text-xl">
          <ChevronRightIcon className="icon-styling text-slate-300 group-hover:text-white" />
        </span>
      </button>
    </Link>
  );
};

export default AdminNavItem;
