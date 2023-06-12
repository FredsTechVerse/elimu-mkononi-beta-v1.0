import React from "react";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../modules/handleLogout";
const LogoutBtn = () => {
  return (
    <div
      onClick={handleLogout}
      className="w-12 h-12 bg-transparent border-2 border-primary rounded-full text-md flex-row-centered cursor-pointer hover:text-white hover:border-white mx-2"
    >
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;
