import React, { useLayoutEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  AdminNavItem,
  HomeBtn,
  LogoutBtn,
  UserProfile,
  UserProfileSkeleton,
} from "../../components";
const AdminSideBar = ({ userDataQuery, isSideBarOpen, toggleSideBar }) => {
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <div
      className={` overflow-auto relative backdrop-blur-xl bg-slate-200/20 laptop:bg-transparent laptop:m-1 laptop:rounded-lg laptop:relative laptop:w-1/4  flex flex-col laptop:h-full phone:justify-start laptop:justify-between gap-2 p-2 ${
        isSideBarOpen
          ? "phone:absolute z-30 tablet:bottom-[55px] tablet:right-2 laptop:right-0 laptop:top-0  h-full tablet:h-max  phone:w-full tablet:w-80 rounded-lg  "
          : "phone:hidden laptop:flex h-full "
      } `}
    >
      <div className=" flex items-center justify-between">
        <HomeBtn icon={true} isBlue={true} />

        <div className="flex-row-centered  gap-2">
          <div>
            <LogoutBtn isBlue={true} />
          </div>
          <div
            className="text-white hover:cursor-pointer w-max h-max tablet:hidden"
            onClick={toggleSideBar}
          >
            <XCircleIcon className="icon-styling w-8 h-8 text-black " />
          </div>
        </div>
      </div>
      <div className="tablet:hidden laptop:block ">
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
          className="controls w-full h-full flex flex-col justify-end  gap-1.5 tablet:gap-2 "
        >
          <AdminNavItem to="courses" text="courses" />
          <AdminNavItem to="students" text="users" />
          <AdminNavItem to="messages" text="messages" />
          <AdminNavItem to="emails" text="emails" />
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
