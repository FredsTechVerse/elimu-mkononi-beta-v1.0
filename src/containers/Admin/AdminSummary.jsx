import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  UserProfile,
  DashboardUserButton,
  DoughnutChart,
  AreaChart,
  LogoutBtn,
  Tooltip,
  UserProfileSkeleton,
  PageTitle,
  DoughnutSkeleton,
  MenuBtn,
} from "../../components";

const AdminSummary = () => {
  const {
    openSideBar,
    isSideBarOpen,
    totalUnits,
    totalCourses,
    totalUsers,
    coursesData,
    coursesAggregationQuery,
    unitsDistribution,
    userDataQuery,
    usersAggregationQuery,
    allUsers,
  } = useOutletContext();
  return (
    <div className=" w-full laptop:w-3/4  flex flex-col justify-start  h-full overflow-auto p-3 overflow-x-hidden ">
      <div className="  w-full  flex phone:flex-col tablet:flex-row justify-between items-center gap-5">
        <div className="phone:w-full tablet:w-3/5 laptop:w-full  bg-slate-300 rounded-xl phone:h-36 tablet:h-full laptop:h-40 flex flex-col-centered relative ">
          <div className="flex flex-row items-center justify-evenly gap-3 absolute top-2  right-2">
            <Tooltip tooltip="Logout">
              <LogoutBtn />
            </Tooltip>
          </div>
          <div className="flex flex-row items-center justify-evenly gap-2 absolute top-2  left-2">
            <MenuBtn openSideBar={openSideBar} sideBarOpen={isSideBarOpen} />
          </div>

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
                  doughnutName="Courses"
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
            <div className="w-full   bg-slate-300 rounded-lg h-64"></div>
            <div className="w-full h-1/3  flex-col-centered gap-1 rounded-lg  ">
              <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
                Quick Access Controls
              </h1>
              <div className="gap-2 p-2 grid grid-cols-1 laptop:grid-cols-2  h-full w-full">
                <DashboardUserButton item="course" />
                <DashboardUserButton item="student" />
                <DashboardUserButton item="tutor" />
                <DashboardUserButton item="admin" />
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
