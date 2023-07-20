import React from "react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { handleLogout } from "../../controllers/handleLogout";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { SpinnerIcon } from "../../components";
const LogoutBtn = ({ position = "sidebar", isSubmitting = true }) => {
  const { updateAlertBoxData } = useAlertBoxContext();
  return (
    <div
      onClick={() => handleLogout({ updateAlertBoxData })}
      className={`${
        position === "navbar"
          ? "border-2 border-white navbar-link"
          : "border-white rounded-full hover:bg-border-2 cursor-pointer"
      }`}
    >
      {position === "navbar" ? (
        <div className="flex flex-row items-center justify-between w-full gap-3 text-md ">
          <span>Logout</span>
          {isSubmitting && <SpinnerIcon />}
        </div>
      ) : (
        <ArrowRightOnRectangleIcon className="h-5 w-5 m-1.5 text-slate-900" />
      )}
    </div>
  );
};

export default LogoutBtn;
