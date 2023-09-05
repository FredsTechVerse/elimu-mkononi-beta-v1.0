import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  AdminNavItem,
  HomeBtn,
  UserProfile,
  UserProfileSkeleton,
} from "../../components";
const AdminSideBar = ({ userDataQuery, isSideBarOpen, toggleSideBar }) => {
  return (
    <div
      className={` ${
        isSideBarOpen
          ? "phone:absolute z-30 tablet:top-[9vh] tablet:right-2 laptop:top-0  h-full tablet:h-max  phone:w-full tablet:w-80 rounded-lg  "
          : "phone:hidden laptop:flex  h-full "
      } backdrop-blur-xl bg-slate-300 bg-opacity-30 laptop:m-1 laptop:rounded-lg laptop:relative laptop:w-1/4  flex flex-col laptop:h-full phone:justify-start laptop:justify-between gap-5 tablet:gap-2 p-2`}
    >
      <div
        className="self-end text-white hover:cursor-pointer w-max h-max tablet:hidden"
        onClick={toggleSideBar}
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
      <div className=" flex flex-col justify-end px-1 ">
        <div
          onClick={toggleSideBar}
          className="controls  w-full h-full flex flex-col justify-end  gap-2 "
        >
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
