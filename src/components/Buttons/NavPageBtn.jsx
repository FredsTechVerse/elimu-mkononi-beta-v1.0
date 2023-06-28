import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
const NavPageBtn = ({ page }) => {
  return (
    <Link to={page}>
      <div className="w-full h-full border-2 bg-primary hover:bg-purple-500 cursor-pointer rounded-md flex-col-centered gap-2 py-2 ">
        <UserIcon className="w-9 phone:h-16 tablet:aspect-square text-white" />
        <span className="capitalize text-xs tablet:text-sm text-center text-white">
          {page}
        </span>
      </div>
    </Link>
  );
};

export default NavPageBtn;
