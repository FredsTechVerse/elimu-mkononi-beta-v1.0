import React from "react";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../modules/handleLogout";
const LogoutBtn = () => {
  return (
    <div
      onClick={handleLogout}
      className="w-8 h-8 border-2 border-primary rounded-full text-md flex-row-centered hover:bg-primary cursor-pointer hover:text-white "
    >
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;
