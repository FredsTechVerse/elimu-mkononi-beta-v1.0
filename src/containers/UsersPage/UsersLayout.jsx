import React from "react";
import { Outlet } from "react-router-dom";
const UsersLayout = () => {
  return (
    <div className="flex flex-col w-full h-full phone:flex-col overflow-auto ">
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default UsersLayout;
