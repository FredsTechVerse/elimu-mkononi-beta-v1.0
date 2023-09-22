import React from "react";
import { Link } from "react-router-dom";
const DashboardUserButton = ({ item, isBlue = false }) => {
  let link = "/new-user";

  if (item === "course") {
    link = `/new-${item}`;
  }
  return (
    <Link
      to={link}
      className={` transition-all  duration-200 text-white text-sm capitalize rounded-md w-full  h-8  flex-row-centered text-center gap-2 group px-2 z-10 ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-700 hover:bg-slate-900  "
      } text-white   `}
    >
      <span className="capitalize text-sm text-center">Add {item}</span>
    </Link>
  );
};

export default DashboardUserButton;
