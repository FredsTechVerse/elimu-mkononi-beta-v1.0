import React from "react";
import {
  AdminCard,
  DashboardUserButton,
  NavPageBtn,
  UserProfile,
  AddBtn,
} from "../../components";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
const AdminDashboard = () => {
  return (
    <div
      id="main"
      className="w-full flex flex-col justify-start items-center bg-slate-100 tablet:p-2"
    >
      <div className="w-full phone:p-0 tablet:p-5 grid  grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 m-3">
        <div className="greetings col-start-1 phone:col-span-1 tablet:col-span-2 row-span-1 flex-row-centered rounded-xl h-48 flex">
          <div className="w-full tablet:w-2/3 h-full  rounded-xl pattern-2 text-white">
            <h1 className=" font-bold text-lg uppercase w-full h-12 flex-row-centered ">
              GREETINGS
            </h1>
            <p className="text-center text-lg px-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, sint.
            </p>
          </div>

          <div className="hidden w-full tablet:flex tablet:w-1/3 flex-col justify-evenly  rounded-xl h-full gap-2 p-2">
            <NavPageBtn page="students" />
            <NavPageBtn page="tutors" />
            <NavPageBtn page="admins" />
            <NavPageBtn page="courses" />
          </div>
        </div>
        <div className="phone:hidden phone:col-span-1 phone:row-span-2  tablet:row-start-2 tablet:col-start-1 tablet:col-span-2 laptop:col-start-3 laptop:row-start-1 laptop:col-span-1 laptop:row-span-3 ">
          <UserProfile />
        </div>

        <AdminCard Number="100" Text="Students" />
        <AdminCard Number="10" Text="Tutors" />
        <AdminCard Number="300" Text="Lessons" />
        <AdminCard Icon={Square3Stack3DIcon} Number="20" Text="Courses" />
      </div>
      <div className="w-full phone:flex-col-centered tablet:flex-row-centered h-[420px]">
        <div className="w-full tablet:w-2/3 h-full rounded-xl bg-slate-300"></div>
        <div className="controls w-full tablet:w-1/3 h-full flex-col-centered">
          <h1 className="text-slate-900 font-bold text-lg uppercase w-full h-12 flex-row-centered ">
            Quick Actions
          </h1>

          <div className=" phone:hidden tablet:grid gap-1 laptop:gap-5 p-5 aspect-video  tablet:grid-cols-2  place-item-center  w-full">
            <AddBtn users="students" user="student" />
            <AddBtn users="tutors" user="tutor" />
            <AddBtn users="admins" user="admin" />
            <AddBtn users="courses" user="course" />
          </div>
          <div className=" phone:grid tablet:hidden gap-1 laptop:gap-5 p-5 aspect-video grid phone:grid-cols-3 tablet:grid-cols-2 place-item-center w-full">
            <AddBtn users="students" user="student" />
            <AddBtn users="tutors" user="tutor" />
            <AddBtn users="admins" user="admin" />
            <AddBtn users="courses" user="course" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
