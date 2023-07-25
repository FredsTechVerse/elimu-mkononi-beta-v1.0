import React, { useEffect, useState } from "react";
import {
  UserProfile,
  DashboardUserButton,
  DoughnutChart,
  PieChart,
  AreaChart,
  AdminNavItem,
  HomeBtn,
  BackBtn,
  UserProfileSkeleton,
  PageTitle,
  DoughnutSkeleton,
  MenuBtn,
} from "../../components";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserDetails,
  fetchCoursesData,
  fetchAllUsersData,
} from "../../controllers/fetchData";

const AdminDashboard = () => {
  const role = "EM-203";
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [allUsers, setAllUsers] = useState({
    labels: ["Students , Tutors , Admins"],
    datasets: [
      {
        label: "Users",
        data: [0, 0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [coursesData, setCoursesData] = useState({
    labels: ["Total Units", "Total Lessons"],
    datasets: [
      {
        label: "Workload",
        data: [0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });

  const [unitsDistribution, setUnitsDistribution] = useState({
    labels: ["Total Units", "Total Lessons"],
    datasets: [
      {
        label: "Workload",
        data: [0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onSuccess: (data) => {},
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  const allUsersQuery = useQuery(["users"], fetchAllUsersData, {
    onSuccess: (data) => {
      setAllUsers({
        labels: ["Students", "Tutors", "Admins"],
        datasets: [
          {
            label: "Users",
            data: [data?.totalStudents, data?.totalTutors, data?.totalAdmins],
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
      setTotalUsers(
        data?.totalStudents + data?.totalTutors + data?.totalAdmins
      );
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });

  const coursesQuery = useQuery(["courses"], fetchCoursesData, {
    onSuccess: async (data) => {
      let totalUnits = 0;
      let coursesOffered = [];
      let unitsPerCourse = [];
      let totalCourses = data?.length;
      data.forEach((course) => {
        totalUnits += course?.units?.length;
        coursesOffered.push(course?.courseTitle);
        unitsPerCourse.push(course?.units?.length);
      });

      setTotalCourses(totalCourses);
      setTotalUnits(totalUnits);
      setCoursesData({
        labels: coursesOffered,
        datasets: [
          {
            label: "Total Units",
            data: unitsPerCourse,
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
      setUnitsDistribution({
        labels: coursesOffered,
        datasets: [
          {
            label: "Units per course",
            data: unitsPerCourse,
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
    },

    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openSideBar = () => {
    setIsSideBarOpen(true);
  };
  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row relative ">
      <div
        className={`   ${
          isSideBarOpen
            ? "phone:absolute z-10 bg-slate-200 phone:h-full tablet:h-80 laptop:h-full phone:w-full tablet:w-80 rounded-lg m-3 "
            : "phone:hidden"
        } laptop:relative laptop:w-1/4  laptop:flex flex-col laptop:h-full justify-between gap-2 p-2`}
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
            <AdminNavItem text="courses" />
            <AdminNavItem text="students" />
            <AdminNavItem text="tutors" />
            <AdminNavItem text="admins" />
            coursesData
          </div>
        </div>
      </div>
      <div className=" w-full laptop:w-3/4  flex flex-col justify-start  h-full overflow-auto p-3 overflow-x-hidden ">
        <div className="w-full  flex phone:flex-col tablet:flex-row justify-between items-center gap-5">
          <div className="phone:w-full tablet:w-3/5 laptop:w-full  bg-slate-300 rounded-xl phone:h-36 tablet:h-full laptop:h-40 flex flex-col-centered relative ">
            <div className="flex flex-row items-center justify-evenly gap-3 absolute top-2  left-2">
              <BackBtn inDashboard={true} isDark={false} />
            </div>
            <div className="flex flex-row items-center justify-evenly gap-2 absolute top-2  right-2">
              <MenuBtn openSideBar={openSideBar} sideBarOpen={isSideBarOpen} />
            </div>

            <h1 className="font-bold text-lg uppercase w-full h-12 flex-row-centered ">
              GREETINGS
            </h1>
            <p className="text-center text-lg px-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, sint.
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
                  {allUsersQuery.status === "loading" ? (
                    <DoughnutSkeleton />
                  ) : (
                    <DoughnutChart
                      chartData={allUsers}
                      doughnutName="total users"
                      doughnutValue={totalUsers}
                    />
                  )}
                </div>
              </div>
              <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-2">
                <div className="col-span-1 row-span-1">
                  {coursesQuery.status === "loading" ? (
                    <DoughnutSkeleton />
                  ) : (
                    <DoughnutChart
                      chartData={unitsDistribution}
                      doughnutName="total units"
                      doughnutValue={totalUnits}
                    />
                  )}
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
                {coursesQuery.status === "loading" ? (
                  <DoughnutSkeleton />
                ) : (
                  <DoughnutChart
                    chartData={coursesData}
                    doughnutName="Courses "
                    doughnutValue={totalCourses}
                  />
                )}
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
