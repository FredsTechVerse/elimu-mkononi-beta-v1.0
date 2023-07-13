import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
const AddBtn = ({ users, user }) => {
  const location = useLocation();
  return (
    <Link to={`${users}/new-${user}`} state={{ background: location }}>
      <div className="w-full h-full border-2 bg-primary hover:bg-purple-500 cursor-pointer rounded-md flex-col-centered gap-2 py-2 ">
        <UserIcon className="w-9 phone:h-16 tablet:aspect-square text-white" />
        <span className="capitalize text-xs tablet:text-sm text-center text-white">
          {users}
        </span>
      </div>
    </Link>
  );
};

export default AddBtn;
