import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  UserProfile,
  DashboardUserButton,
  DoughnutChart,
  AreaChart,
  UserProfileSkeleton,
  PageTitle,
  NavMenuBtn,
} from "../../components";

const AdminSummary = () => {
  const {
    toggleSideBar,
    isSideBarOpen,
    totalUnits,
    totalCourses,
    totalUsers,
    coursesData,
    unitsDistribution,
    userDataQuery,
    allUsers,
  } = useOutletContext();
  return (
    <div className=" w-full laptop:w-3/4  flex flex-col justify-start  h-full overflow-y-scroll p-3 overflow-x-hidden ">
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>
      <div className="w-full  flex phone:flex-col tablet:flex-row justify-between items-center gap-5">
        <div className="phone:w-full tablet:w-3/5 order-2 laptop:w-full  bg-blue-500 bg-opacity-10 rounded-xl phone:h-36 tablet:h-full laptop:h-40 flex flex-col-centered relative ">
          <h1 className="font-bold text-lg uppercase w-full h-12 flex-row-centered ">
            Admin Dashboard
          </h1>
          <p className="text-center text-lg px-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
            sint.
          </p>
        </div>
        <div className="phone:hidden tablet:w-2/5 tablet:flex laptop:hidden">
          {userDataQuery.status === "loading" ? (
            <UserProfileSkeleton />
          ) : (
            <UserProfile
              name={`${userDataQuery?.data?.firstName}  ${userDataQuery?.data?.surname} `}
              role="tutor"
            />
          )}
        </div>
      </div>
      <div className="flex phone:flex-col tablet:flex-row w-full gap-5">
        <div className="phone:w-full tablet:w-2/3 flex flex-col gap-2 pt-2">
          <PageTitle title="statistics" />
          <div className="w-full flex phone:flex-col tablet:flex-row justify-evenly ">
            <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-5">
              <div className="col-span-1 row-span-1">
                <DoughnutChart
                  chartData={allUsers}
                  doughnutName="total users"
                  doughnutValue={totalUsers}
                />
              </div>
            </div>
            <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-2">
              <div className="col-span-1 row-span-1">
                <DoughnutChart
                  chartData={coursesData}
                  doughnutName="total courses"
                  doughnutValue={totalCourses}
                />
              </div>
            </div>
          </div>
          <div className="phone:h-[250px] tablet:h-[370px] mt-5  p-2 w-full  flex-col-centered rounded-xl">
            <PageTitle title="Application Traffic data" />
            <AreaChart />
          </div>
        </div>
        <div className="phone:w-full tablet:w-1/3 pt-2 ">
          <div className="flex flex-col justify-evenly items-center gap-5  ">
            <div className="h-1/3 ">
              <div className="pb-7">
                <PageTitle title="Units" />
              </div>

              <DoughnutChart
                chartData={unitsDistribution}
                doughnutName="total units"
                doughnutValue={totalUnits}
              />
            </div>
            <div className="w-full  pt-2.5 bg-blue-500 bg-opacity-10 rounded-lg h-64 flex flex-col justify-between items-center  ">
              <h1 className="uppercase text-sm font-bold">Notifications</h1>
              <div className="h-[1px] w-full bg-slate-300 mt-1.5"></div>
              <div className="h-full w-full flex-col-centered">
                <p className="text-sm text-slate-800">No notifications </p>
              </div>
            </div>
            <div className="w-full h-1/3  flex-col-centered gap-1 rounded-lg  ">
              <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
                Quick Access Controls
              </h1>
              <div className="gap-2 p-2 grid grid-cols-1 laptop:grid-cols-2  h-full w-full">
                <DashboardUserButton isBlue={true} item="course" />
                <DashboardUserButton isBlue={true} item="student" />
                <DashboardUserButton isBlue={true} item="tutor" />
                <DashboardUserButton isBlue={true} item="admin" />
              </div>
            </div>
          </div>

          <div className="bg-slate-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
