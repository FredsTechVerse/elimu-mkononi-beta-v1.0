import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
const DashboardUserButton = ({ item }) => {
  const location = useLocation();
  let roleInformation = {};
  if (item === "course") {
    roleInformation = null;
  } else if (item === "student") {
    roleInformation = "EM-201";
  } else if (item === "tutor") {
    roleInformation = "EM-202";
  } else if (item === "admin") {
    roleInformation = "EM-203";
  }

  if (item !== "course") {
    return (
      <div className="w-full h-full ">
        <Link
          to={`/new-user`}
          state={{ background: location, role: roleInformation }}
        >
          <div className=" w-full h-full bg-primary text-white hover:bg-purple-500 cursor-pointer rounded-lg flex-col-centered gap-2">
            <UserPlusIcon className="w-9 aspect-square text-white" />
            <span className="capitalize text-sm text-center">Add {item}</span>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full ">
        <Link
          to={`/new-${item}`}
          state={{ background: location, role: roleInformation }}
        >
          <div className=" w-full h-full bg-primary text-white hover:bg-purple-500 cursor-pointer rounded-lg flex-col-centered gap-2">
            <UserPlusIcon className="w-9 aspect-square text-white" />
            <span className="capitalize text-sm text-center">Add {item}</span>
          </div>
        </Link>
      </div>
    );
  }
};

export default DashboardUserButton;
