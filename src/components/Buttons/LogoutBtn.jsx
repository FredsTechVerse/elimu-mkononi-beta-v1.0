import React from "react";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../modules/handleLogout";
const LogoutBtn = () => {
  return (
    <div
      onClick={handleLogout}
      className="w-11 h-11 bg-white border-2 inline border-primary rounded-full text-md flex-row-centered hover:bg-primary cursor-pointer hover:text-white mx-2 "
    >
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;
