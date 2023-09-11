import React from "react";
import {
  AdminNavItem,
  LogoutBtn,
  UserProfileSkeleton,
  UserProfile,
} from "../../components";
import { XCircleIcon } from "@heroicons/react/24/solid";

const TutorSideBar = ({ isSideBarOpen, userDataQuery, toggleSideBar }) => {
  return (
    <div
      className={` overflow-auto ${
        isSideBarOpen
          ? "absolute z-30 tablet:bottom-[55px] tablet:right-2 laptop:right-0 laptop:top-0  h-full tablet:h-max  phone:w-full tablet:w-80 rounded-lg  "
          : "hidden laptop:flex h-full "
      } relative backdrop-blur-xl  bg-slate-200/20 laptop:bg-transparent  laptop:m-1 laptop:rounded-lg laptop:relative laptop:w-1/4  flex flex-col laptop:h-full phone:justify-start laptop:justify-between gap-2 p-2`}
    >
      <div className=" flex items-center justify-between">
        <div className="w-full flex items-center justify-between  gap-2">
          <div
            className="text-white hover:cursor-pointer w-max h-max laptop:hidden "
            onClick={toggleSideBar}
          >
            <XCircleIcon className="icon-styling w-8 h-8 text-black " />
          </div>
          <div className="ml-auto ">
            <LogoutBtn isBlue={true} />
          </div>
        </div>
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
      <div className="w-full flex-col-centered gap-1 rounded-lg  ">
        <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
          Quick Access Controls
        </h1>
        <div className="gap-2 p-2 grid grid-cols-1  h-full w-full">
          <AdminNavItem
            page="tutorDashboard"
            to="/new-chapter"
            text="chapter"
          />
          <AdminNavItem page="tutorDashboard" to="/new-lesson" text="lesson" />
          <AdminNavItem
            page="tutorDashboard"
            to="/new-resource"
            text="resource"
          />
        </div>
      </div>
    </div>
  );
};

export default TutorSideBar;
