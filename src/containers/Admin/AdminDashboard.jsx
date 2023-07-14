import React from "react";
import {
  TutorCardHome,
  UserProfile,
  DashboardUserButton,
  NavPageBtn,
  DoughnutChart,
  PieChart,
  AreaChart,
} from "../../components";
import { useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const tutorData = useOutletContext();
  return (
    <div className="h-screen w-full py-2 flex phone:flex-col tablet:flex-row  ">
      <div className="w-1/4 phone:hidden laptop:flex flex-col h-full justify-between p-2">
        <UserProfile />
        <div className="controls w-full h-full flex-col-centered gap-2 ">
          <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
            Navigate to Pages
          </h1>
          <div className="h-12 w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
            View Students
          </div>
          <div className="h-12 w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
            View Tutors
          </div>
          <div className="h-12 w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
            View Course
          </div>
          <div className="h-12 w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
            View Admins
          </div>
        </div>
      </div>
      <div className="w-full laptop:w-3/4  flex flex-col justify-start gap- h-full overflow-auto ">
        <div className="w-full flex phone:flex-col tablet:flex-row justify-between items-center   gap-5">
          <div className="phone:w-full tablet:w-2/3 bg-slate-300 rounded-xl h-40 flex-col-centered ">
            <h1 className="font-bold text-lg uppercase w-full h-12 flex-row-centered ">
              GREETINGS
            </h1>
            <p className="text-center text-lg px-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, sint.
            </p>
          </div>
          <div className="h-full phone:w-full tablet:w-1/3 flex-col-centered gap-1 rounded-lg bg-slate-300 "></div>
        </div>
        <div className="flex phone:flex-col tablet:flex-row w-full gap-5">
          <div className="phone:w-full tablet:w-2/3 flex flex-col gap-2 ">
            <div className="w-full flex phone:flex-col tablet:flex-row justify-evenly ">
              <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-2">
                <div className="col-span-1 row-span-1">
                  <DoughnutChart />
                </div>
                <div className="w-full rounded-lg h-16 bg-slate-300"></div>
              </div>
              <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-2">
                <div className="col-span-1 row-span-1">
                  <DoughnutChart />
                </div>
                <div className="w-full rounded-lg h-16 bg-slate-300"></div>
              </div>
            </div>
            <div className="phone:h-[250px] tablet:h-[370px] tablet:w-full mt-5  p-2 tablet:w-2/3 flex-col-centered  graph  bg-slate-200 rounded-xl">
              <AreaChart />
            </div>
          </div>
          <div className="phone:w-full tablet:w-1/3 ">
            <div className="flex flex-col justify-evenly items-center gap-5 py-5 ">
              <div className="h-1/3">
                <PieChart />
              </div>
              <div className="w-full   bg-slate-300 rounded-lg h-64"></div>
              <div className="w-full h-1/3  flex-col-centered gap-1 rounded-lg  ">
                <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
                  Quick Access Controls
                </h1>
                <div className="gap-2 p-2 grid grid-cols-2  h-full w-full">
                  <DashboardUserButton user="chapter" />
                  <DashboardUserButton user="lesson" />
                  <DashboardUserButton user="resource" />
                  <DashboardUserButton user="information" />
                </div>
              </div>
            </div>

            <div className="bg-slate-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
