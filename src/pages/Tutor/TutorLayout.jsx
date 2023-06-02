import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { TutorSideBar } from "../../components";
import { handleLogout } from "../../modules/handleLogout";
import { RiMenu3Fill } from "react-icons/ri";
import axios from "../../axios";
const TutorLayout = () => {
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
      if (error.response.status === 403) {
        handleLogout();
      } else {
        console.log(error.response.status);
      }
    }
  };
  return (
    <main className="flex relative laptop:grid  laptop:grid-cols-4 w-full h-screen">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }   w-full h-full absolute laptop:relative laptop:block laptop:col-span-1 `}
      >
        <TutorSideBar tutor={tutorData} closeSideBar={closeSideBar} />
      </article>
      <article className="w-full h-full flex px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto ">
        <div
          className={` flex px-2 items-center justify-end w-full text-lg text-center text-white my-2 py-2 bg-primary rounded-lg`}
        >
          <h1>TUTOR HEADING</h1>
          <div
            onClick={openSideBar}
            className={`text-2xl w-10 h-10 border-2 border-primary rounded-full flex-col-centered laptop:hidden`}
          >
            <RiMenu3Fill />
          </div>
        </div>
        <Outlet context={tutorData} />
      </article>
    </main>
  );
};

export default TutorLayout;
