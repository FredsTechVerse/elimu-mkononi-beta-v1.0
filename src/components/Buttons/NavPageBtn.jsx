import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
const NavPageBtn = ({ page }) => {
  return (
    <Link
      to={page}
      className="w-full h-full border-2 bg-primary hover:bg-purple-500 cursor-pointer rounded-md flex-col-centered gap-2 py-2 "
    >
      <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
        View {page}
      </div>
    </Link>
  );
};

export default NavPageBtn;
