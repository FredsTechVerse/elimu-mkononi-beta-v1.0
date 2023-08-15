import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
const DashboardUserButton = ({ item, isRounded = true }) => {
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
      className={` w-full h-full bg-primary text-white hover:bg-purple-500 cursor-pointer ${
        isRounded ? "rounded-full" : "rounded-md"
      } flex flex-row justify-center items-center gap-2 py-2`}
    >
      <span className="capitalize text-sm text-center"> {item}</span>
      <PlusIcon className="w-6 aspect-square text-white" />
    </Link>
  );
};

export default DashboardUserButton;
