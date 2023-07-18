import React from "react";
import { Outlet } from "react-router-dom";
import { HomeBtn, BackBtn } from "../../components";

const Layout = () => {
  return (
    <main className="flex relative w-full h-screen px-2 flex-col rounded-lg pb-2 laptop:col-span-3 ">
      <Outlet />
    </main>
  );
};

export default Layout;
