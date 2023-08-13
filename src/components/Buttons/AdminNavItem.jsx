import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";
const AdminNavItem = ({ text, to, page = null }) => {
  const location = useLocation();
  if (page === "tutorDashboard") {
    return (
      <Link to={to} state={{ background: location }}>
        <button className="group h-12 w-full pointer-cursor hover:bg-purple-400  text-white rounded-lg bg-primary rounded-ms capitalize">
          <div className="flex justify-between items-center px-4">
            Add {text}
            <span className="text-xl">
              <ChevronRightIcon className="icon-styling text-slate-300 group-hover:text-white" />
            </span>
          </div>
        </button>
      </Link>
    );
  }

  return (
    <Link to={to}>
      <button className="group h-12 w-full pointer-cursor hover:bg-purple-400  text-white rounded-lg bg-primary rounded-ms capitalize">
        <div className="flex justify-between items-center px-4">
          Visit {text}
          <span className="text-xl">
            <ChevronRightIcon className="icon-styling text-slate-300 group-hover:text-white" />
          </span>
        </div>
      </button>
    </Link>
  );
};

export default AdminNavItem;
