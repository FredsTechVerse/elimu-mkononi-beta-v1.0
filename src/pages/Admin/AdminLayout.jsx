import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminSideBar } from "../../components";
import { RiMenu3Fill } from "react-icons/ri";
import axios from "../../axios";
const AdminLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  useEffect(() => {
    // fetchTutorDetails();
  }, []);
  const accessToken = localStorage.getItem("accessToken");

  const fetchTutorDetails = async () => {
    try {
      const { data, status } = await axios.get("/auth/tutor", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        console.log(data);
        setTutorData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex relative tablet:grid  tablet:grid-cols-3 laptop:grid-cols-4 w-full h-screen overflow-hidden ">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }   w-full h-full absolute tablet:relative tablet:block  tablet:col-span-1 `}
      >
        <AdminSideBar closeSideBar={closeSideBar} />
      </article>
      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full laptop:overflow-y-auto flex px-2 flex-col rounded-lg pb-2 overflow-auto">
        <div className="relative tablet:hidden ">
          <div
            onClick={openSideBar}
            className={`${
              sideBarOpen ? "hidden" : "block"
            } absolute right-2 text-2xl w-10 h-10 border-2 border-primary rounded-full flex-col-centered `}
          >
            <RiMenu3Fill />
          </div>
        </div>
        <div className="debug">
          <Outlet />
        </div>
      </article>
    </main>
  );
};

export default AdminLayout;
