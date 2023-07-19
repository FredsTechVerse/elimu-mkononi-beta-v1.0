import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { handleLogout } from "../../controllers/handleLogout";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const LogoutBtn = ({ position = "sidebar" }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  return (
    <div
      onClick={() => handleLogout({ updateAlertBoxData })}
      className={`${
        position === "navbar"
          ? "border-2 border-white navbar-link"
          : "border-white rounded-full text-md flex-row-centered hover:bg-border-2 cursor-pointer"
      }`}
    >
      {position === "navbar" ? (
        "Logout"
      ) : (
        <ArrowRightOnRectangleIcon className="h-5 w-5 m-1.5 text-slate-900" />
      )}
    </div>
  );
};

export default LogoutBtn;
