import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { TutorSideBar, AdminSideBar, PageTitle } from "../../components";
import { handleLogout } from "../../controllers/handleLogout";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import axios from "../../axios";
const Layout = ({ role }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const accessToken = localStorage.getItem("accessToken");

  const fetchUserDetails = async () => {
    try {
      if ((role = "EM-202")) {
        const { data, status } = await axios.get("/auth/tutor", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (status === 200) {
          console.log(data);
          setUserData(data);
        }
      } else if ((role = "EM-203")) {
        const { data, status } = await axios.get("/auth/admin", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (status === 200) {
          setUserData(data);
        }
      }
    } catch (error) {
      if (error?.response?.status === 403) {
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
        {role === "EM-202" && (
          <TutorSideBar tutor={userData} closeSideBar={closeSideBar} />
        )}

        {role === "EM-203" && <AdminSideBar closeSideBar={closeSideBar} />}
      </article>
      <article className="w-full h-full flex px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto ">
        <div
          onClick={openSideBar}
          className={`fixed top-2 right-5 text-2xl w-10 h-10 border-2 border-primary rounded-full flex-col-centered laptop:hidden`}
        >
          <Bars3BottomRightIcon className="icon-styling " />
        </div>
        {role === "EM-202" && <PageTitle text="Units you handle" />}
        <Outlet context={userData} />
      </article>
    </main>
  );
};

export default Layout;
