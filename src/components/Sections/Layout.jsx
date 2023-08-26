import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex relative w-full h-screen  flex-col rounded-lg pb-2 laptop:col-span-3 ">
      <Outlet />
    </main>
  );
};

export default Layout;
