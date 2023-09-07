import React from "react";
import { Link, useLocation } from "react-router-dom";
const DashboardUserButton = ({ item, isBlue = false }) => {
  const location = useLocation();
  let link = "/new-user";

  let roleInformation = {};
  if (item === "course") {
    roleInformation = "";
  } else if (item === "student") {
    roleInformation = "EM-201";
  } else if (item === "tutor") {
    roleInformation = "EM-202";
  } else if (item === "admin") {
    roleInformation = "EM-203";
  }

  if (item === "course") {
    link = `/new-${item}`;
  }
  return (
    <Link
      to={link}
      state={{ background: location, role: roleInformation }}
      className={` transition-all  duration-200 text-white text-sm capitalize rounded-md w-full  h-10 flex-row-centered text-center gap-2 group px-2 z-10 ${
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
