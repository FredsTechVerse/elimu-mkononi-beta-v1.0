import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
const DashboardUserButton = ({ item, isRounded = true, isBlue = false }) => {
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
      className={`text-white text-sm capitalize rounded-md w-full h-10 flex-row-centered group ${
        isBlue
          ? "bg-primary hover:bg-purple-500 "
          : "bg-slate-700 hover:bg-slate-900  "
      } text-white   `}
    >
      <span className="capitalize text-sm text-center"> {item}</span>
      <PlusIcon className="w-6 aspect-square text-white" />
    </Link>
  );
};

export default DashboardUserButton;
