import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Admin/Sidebar";
import { RiMenu3Fill } from "react-icons/ri";
import axios from "../../axios";
const AdminLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [tutorData, setTutorData] = useState(null);
  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  useEffect(() => {
    fetchTutorDetails();
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
  console.log(sideBarOpen);
  return (
    <main className="flex relative laptop:grid  laptop:grid-cols-4 w-full h-screen overflow-auto">
      <article
        className={` ${
          sideBarOpen ? "flex" : "hidden"
        }   w-full h-full absolute tablet:col-span-1 tablet:relative tablet:flex tablet:flex-col laptop:overflow-y-auto `}
      >
        <Sidebar closeSideBar={closeSideBar} />
      </article>
      <article className="w-full laptop:col-span-3 h-full laptop:overflow-y-auto flex px-2 flex-col rounded-lg pb-2">
        <div className="flex px-2 items-center justify-end w-full text-lg text-center text-white my-2 py-2 bg-primary rounded-lg">
          <div
            onClick={() => {
              openSideBar();
            }}
            className="tablet:hidden"
          >
            <RiMenu3Fill />
          </div>
        </div>
        <Outlet context={"Hello"} />
      </article>
    </main>
  );
};

export default AdminLayout;
