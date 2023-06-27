import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
const AdminNavItem = ({ to, text }) => {
  return (
    <Link to={to}>
      <div className="button debug ">
        {text}
        <span className="text-xl">
          <ChevronRightIcon className="icon-styling" />
        </span>
      </div>
    </Link>
  );
};

export default AdminNavItem;
