import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminSideBar } from "../../components";
import { RiMenu3Fill } from "react-icons/ri";
import axios from "../../axios";
const Layout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  useEffect(() => {
    // fetchAdminDetails();
  }, []);
  const accessToken = localStorage.getItem("accessToken");

  const fetchAdminDetails = async () => {
    try {
      const { data, status } = await axios.get("/auth/admin", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        console.log(data);
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex relative laptop:grid  laptop:grid-cols-4 w-full h-screen">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }   w-full h-full absolute laptop:relative laptop:block laptop:col-span-1 `}
      >
        <AdminSideBar closeSideBar={closeSideBar} />
      </article>
      <article className="w-full h-full flex px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto ">
        <div
          className={` flex px-2 items-center justify-end w-full text-lg text-center text-white my-2 py-2 bg-primary rounded-lg`}
        >
          <h1>ADMIN HEADING</h1>
          <div
            onClick={openSideBar}
            className={`text-2xl w-10 h-10 border-2 border-primary rounded-full flex-col-centered laptop:hidden `}
          >
            <RiMenu3Fill />
          </div>
        </div>
        <Outlet />
      </article>
    </main>
  );
};

export default Layout;
