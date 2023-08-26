import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  AdminNavItem,
  UserProfile,
  UserProfileSkeleton,
} from "../../components";
const AdminSideBar = ({ userDataQuery, closeSideBar, isSideBarOpen }) => {
  return (
    <div
      className={`   ${
        isSideBarOpen
          ? "phone:absolute z-10 bg-slate-200 phone:h-full tablet:h-80 laptop:h-full phone:w-full tablet:w-80 rounded-lg m-3 "
          : "phone:hidden"
      }  laptop:relative laptop:w-1/4  laptop:flex flex-col laptop:h-full justify-between gap-2 p-2`}
    >
      <div
        className="absolute right-4 top-3 text-white m-1 hover:cursor-pointer w-7 h-7 laptop:hidden"
        onClick={() => {
          closeSideBar();
        }}
      >
        <XCircleIcon className="icon-styling w-8 h-8 text-black" />
      </div>
      <div className="tablet:hidden laptop:block">
        {userDataQuery.status === "loading" ? (
          <UserProfileSkeleton />
        ) : (
          <UserProfile
            name={`${userDataQuery?.data?.firstName}  ${userDataQuery?.data?.surname} `}
            role="tutor"
          />
        )}
      </div>
      <div className="flex flex-col justify-end px-1 pb-3 ">
        <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
          Go to pages
        </h1>
        <div className="controls  w-full h-full flex flex-col justify-end  gap-2 ">
          <AdminNavItem to="courses" text="courses" />
          <AdminNavItem to="students" text="students" />
          <AdminNavItem to="tutors" text="tutors" />
          <AdminNavItem to="admins" text="admins" />
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
