import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { HomeBtn, BackBtn } from "../../components";
import { fetchUserDetails } from "../../controllers/fetchData";
import { useQuery } from "@tanstack/react-query";

const Layout = ({ role }) => {
  const [userData, setUserData] = useState(null);

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    onSuccess: (data) => {
      setUserData(data);
    },
    onError: (error) => {
      if (error?.response?.status === 403) {
        handleLogout();
      } else {
        console.log(error.response.status);
      }
    },
  });
  useEffect(() => {
    userDataQuery.refetch();
  }, []);
  return (
    <main className="flex relative w-full h-screen px-2 flex-col rounded-lg pb-2 laptop:col-span-3 overflow-y-auto">
      <div className="flex-row-centered gap-2 fixed top-2 left-3">
        <BackBtn isDark={true} />
        <HomeBtn isDark={true} />
      </div>
      <Outlet context={userData} />
    </main>
  );
};

export default Layout;
