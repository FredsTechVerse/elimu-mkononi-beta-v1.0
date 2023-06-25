import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { PageTitle, HomeBtn, BackBtn } from "../../components";
import { handleLogout } from "../../controllers/handleLogout";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import axios from "../../axios";
const Layout = ({ role }) => {
  const [userData, setUserData] = useState(null);

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
    <main className="flex relative w-full h-screen px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto">
      <div className="flex-row-centered gap-2 fixed top-2 left-3">
        <BackBtn />
        <HomeBtn />
      </div>

      {/* {role === "EM-202" && <PageTitle text="Units you handle" />} */}
      <Outlet context={userData} />
    </main>
  );
};

export default Layout;
