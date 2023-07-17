import React from "react";
import { Outlet } from "react-router-dom";
import { HomeBtn, BackBtn } from "../../components";

const Layout = () => {
  return (
    <main className="flex relative w-full h-screen px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto">
      <div className="flex-row-centered gap-2 fixed top-2 left-3 z-10">
        <BackBtn isDark={true} />
        <HomeBtn isDark={true} />
      </div>
      <Outlet />
    </main>
  );
};

export default Layout;
