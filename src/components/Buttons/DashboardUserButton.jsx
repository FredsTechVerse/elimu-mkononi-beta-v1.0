import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
const DashboardUserButton = ({ item }) => {
  const location = useLocation();
  return (
    <div className="w-full h-full ">
      <Link to={`/tutor/new-${item}/${null}`} state={{ background: location }}>
        <div className=" w-full h-full bg-primary text-white hover:bg-purple-500 cursor-pointer rounded-lg flex-col-centered gap-2">
          <UserPlusIcon className="w-9 aspect-square text-white" />
          <span className="capitalize text-sm text-center">Add {item}</span>
        </div>
      </Link>
    </div>
  );
};

export default DashboardUserButton;
