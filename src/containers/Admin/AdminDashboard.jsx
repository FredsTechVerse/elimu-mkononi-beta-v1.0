import React from "react";
import { AdminCard, DashboardUserButton, UserProfile } from "../../components";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
const AdminDashboard = () => {
  return (
    <div
      id="main"
      className="w-full flex flex-col justify-start bg-slate-100 p-2"
    >
      <div className="w-full p-5 grid phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5 m-3">
        <div className="phone:col-span-1 phone:row-span-2  tablet:row-start-2 tablet:col-start-1 tablet:col-span-2 laptop:col-start-3 laptop:row-start-1 laptop:col-span-1 laptop:row-span-3 ">
          <UserProfile />
        </div>
        <div className="greetings col-start-1 col-span-2 row-span-1 flex-row-centered rounded-xl h-48 flex">
          <div className="w-2/3 h-full bg-slate-300 rounded-xl">
            <h1 className="text-slate-900 font-bold text-lg uppercase w-full h-12 flex-row-centered ">
              GREETINGS
            </h1>
            <p className="text-center text-lg px-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, sint.
            </p>
          </div>

          <div className=" w-1/3 flex flex-col justify-evenly  rounded-xl h-full gap-2 p-2">
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Students
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Tutors
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Course
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Admins
            </div>
          </div>
        </div>

        <AdminCard Number="100" Text="Students" />
        <AdminCard Number="10" Text="Tutors" />
        <AdminCard Number="300" Text="Lessons" />
        <AdminCard Icon={Square3Stack3DIcon} Number="20" Text="Courses" />
      </div>
      <div className="statistics flex-row-centered h-[420px]">
        <div className="w-2/3 h-full rounded-xl bg-slate-300"></div>
        <div className="controls w-1/3 h-full flex-col-centered">
          <h1 className="text-slate-900 font-bold text-lg uppercase w-full h-12 flex-row-centered ">
            Controls
          </h1>
          <div className=" gap-1 laptop:gap-5 p-5 aspect-video grid tablet:grid-cols-2 laptop:grid-cols-3 place-item-center h-full w-full">
            <DashboardUserButton user="tutor" />
            <DashboardUserButton user="student" />
            <DashboardUserButton user="admin" />
            <DashboardUserButton user="course" />
            <DashboardUserButton user="unit" />
            <DashboardUserButton user="chapter" />
            <DashboardUserButton user="lesson" />
            <DashboardUserButton user="resource" />
            <DashboardUserButton user="information" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
