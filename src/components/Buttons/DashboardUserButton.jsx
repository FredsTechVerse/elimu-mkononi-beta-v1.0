import React from "react";
import { Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
const DashboardUserButton = ({ user }) => {
  return (
    <div className="w-full h-full">
      <Link to={user}>
        <div className=" w-full h-full bg-white border-2 border-primary hover:border-purple-500 cursor-pointer rounded-lg flex-col-centered gap-2">
          <UserPlusIcon className="w-9 aspect-square text-slate-800" />
          <span className="capitalize text-sm text-center">Add {user}</span>
        </div>
      </Link>
    </div>
  );
};

export default DashboardUserButton;