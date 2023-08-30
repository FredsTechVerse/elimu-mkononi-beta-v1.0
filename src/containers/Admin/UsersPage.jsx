import React from "react";
import {
  UsersTable,
  PageTitle,
  TableAlternativeSkeleton,
  DashboardUserButton,
  MenuBtn,
  TableSkeleton,
  HomeBtn,
  NavBgBtn,
} from "../../components";
import { UsersGrid } from "../../containers";
import { useOutletContext } from "react-router-dom";
import { fetchUsersData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const UsersPage = () => {
  const { role } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();

  const assignUserRole = () => {
    if (role === "students") {
      return "EM-201";
    } else if (role === "tutors") {
      return "EM-202";
    } else if (role === "admins") {
      return "EM-203";
    }
  };
  const userRole = assignUserRole();

  const usersQuery = useQuery([userRole], () => fetchUsersData(userRole), {
    retry: 1,
    staleTime: 1000 * 60 * 30,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries([userRole]);
      }
    },
  });

  const { openSideBar, isSideBarOpen } = useOutletContext();

  return (
    <div className="relative w-full laptop:w-3/4  flex flex-col justify-start items-center  h-full overflow-auto p-3 overflow-x-hidden ">
      <div className="absolute top-2 left-2 flex-row-centered gap-2">
        <HomeBtn isDark={true} />
        <MenuBtn openSideBar={openSideBar} sideBarOpen={isSideBarOpen} />
      </div>

      <div className="absolute top-2 right-2 flex-row-centered gap-2 w-32 h-10 ">
        <DashboardUserButton
          isRounded={false}
          item={
            userRole === "EM-203"
              ? "admin"
              : userRole === "EM-202"
              ? "tutor"
              : "student"
          }
        />

        <NavBgBtn to="/new-message" text="Message" />
      </div>
      <div className="relative top-2">
        <PageTitle
          title={
            userRole === "EM-201"
              ? "Student's Summary"
              : userRole === "EM-202"
              ? "tutor's summary"
              : "Admin's Summary"
          }
        />
      </div>
      {usersQuery.status === "loading" ? (
        <div className=" w-full mt-5">
          <TableSkeleton />
          <TableAlternativeSkeleton />
        </div>
      ) : (
        <div className=" w-full mt-5 ">
          <div className=" w-full px-3 relative">
            <UsersGrid usersQuery={usersQuery} role={userRole} />
            <UsersTable usersQuery={usersQuery} role={userRole} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
