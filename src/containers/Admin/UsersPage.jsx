import React from "react";
import {
  UsersTable,
  PageTitle,
  TableAlternativeSkeleton,
  DashboardUserButton,
  TableSkeleton,
  NavBgBtn,
  NavMenuBtn,
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
    staleTime: 1000 * 60 * 30,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries([userRole]);
      }
    },
  });

  const { isSideBarOpen, toggleSideBar } = useOutletContext();

  return (
    <div className="relative w-full laptop:w-3/4  flex flex-col justify-start items-center  h-full overflow-auto p-3 overflow-x-hidden ">
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>

      <div className="absolute top-2 right-2 flex-row-centered gap-2 ">
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
        <NavBgBtn to={`/admin/students`} text="students" />
        <NavBgBtn to={`/admin/tutors`} text="tutors" />
        <NavBgBtn to={`/admin/admins`} text="admins" />
        <NavBgBtn to={`/new-message/${userRole}`} text="Message" />
      </div>
      <div className="absolute top-12 mx-auto tablet:pt-0">
        <PageTitle
          title={
            userRole === "EM-201"
              ? "Student's Summary"
              : userRole === "EM-202"
              ? "tutor's summary"
              : "Administrators Summary"
          }
        />
      </div>
      {usersQuery.status === "loading" ? (
        <div className=" w-full mt-16 tablet:mt-20">
          <TableSkeleton />
          <TableAlternativeSkeleton />
        </div>
      ) : (
        <div className=" w-full mt-16 ">
          <div className=" w-full relative">
            <UsersTable usersQuery={usersQuery} role={userRole} />
            <UsersGrid usersQuery={usersQuery} role={userRole} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
