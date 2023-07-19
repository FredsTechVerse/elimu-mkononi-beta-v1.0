import React, { useState } from "react";
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
} from "../../components";

import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserDetails,
  fetchCoursesData,
} from "../../controllers/fetchData";

const AdminDashboard = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const role = "EM-203";
  const [coursesData, setCoursesData] = useState({});
  const [usersData, setUsersData] = useState({});
  const [unitsDistribution, setUnitsDistribution] = useState({
    // I need to fetch all courses data from here and count my units and their names
    labels: [
      "Mechanical Engineering",
      "Mechatronics Engineering",
      "Electrical Engineering",
      "Chemical Engineering",
      "Telecommunication Engineering",
    ],
    datasets: [
      {
        label: "Total Units",
        data: [8, 4, 2, 3, 7, 9, 10],
        backgroundColor: ["green", "blue", "red"],
        borderColor: ["green", "blue", "red"],
      },
    ],
  });

  const coursesQuery = useQuery(["courses"], fetchCoursesData, {
    retry: 1,
    onSuccess: (data) => {
      let totalUnits = data?.units?.length;
      let totalLessons = 0;
      data?.units?.forEach((unit) => {
        unit.unitChapters.forEach((chapter) => {
          totalLessons += chapter.chapterLessons.length;
        });
      });
      console.log(`Courses Data : ${JSON.stringify(data)}`);

      setCoursesData({
        ...coursesData,
        datasets: [
          {
            label: "Courses Data",
            data: [totalUnits, totalLessons],
            backgroundColor: ["green", "blue"],
            borderColor: ["green", "blue"],
          },
        ],
      });

      console.log({ totalUnits, totalLessons });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        console.log("Refetching user details!");
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onSuccess: (data) => {
      console.log(`User Data : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });

  return (
    <div className="h-screen w-full py-2 flex phone:flex-col tablet:flex-row  ">
      <div className="w-1/4 phone:hidden laptop:flex flex-col h-full justify-between p-2">
        {userDataQuery.status === "loading" &&
        coursesQuery.status === "loading" ? (
          <UserProfileSkeleton />
        ) : (
          <UserProfile
            name={`${userDataQuery?.data?.firstName}  ${userDataQuery?.data?.surname} `}
            role="tutor"
          />
        )}{" "}
        <div className="controls w-full h-full flex flex-col justify-start gap-2 px-1 ">
          <AdminNavItem text="courses" />
          <AdminNavItem text="students" />
          <AdminNavItem text="tutors" />
          <AdminNavItem text="admins" />
        </div>
      </div>
      <div className="w-full laptop:w-3/4  flex flex-col justify-start  h-full overflow-auto ">
        <div className="w-full flex phone:flex-col tablet:flex-row justify-between items-center   gap-5">
          <div className="phone:w-full tablet:w-2/3 bg-slate-300 rounded-xl h-40 flex flex-col-centered relative ">
            <div className="flex-row-centered gap-2 absolute top-2 left-3 z-10">
              <BackBtn inDashboard={true} isDark={false} />
              <HomeBtn inDashboard={true} isDark={false} />
            </div>
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
                  <DoughnutChart chartData={usersData} />
                </div>
                <div className="w-full rounded-lg h-16 bg-slate-300"></div>
              </div>
              <div className="phone:w-full tablet:w-1/2 gap-5 border-blue-400 flex-col-centered p-2">
                <div className="col-span-1 row-span-1">
                  <DoughnutChart chartData={unitsDistribution} />
                </div>
                <div className="w-full rounded-lg h-16 bg-slate-300"></div>
              </div>
            </div>
            <div className="phone:h-[250px] tablet:h-[370px] mt-5  p-2 w-full  flex-col-centered rounded-xl">
              <PageTitle text="Application Traffic data" />
              <AreaChart />
            </div>
          </div>
          <div className="phone:w-full tablet:w-1/3 ">
            <div className="flex flex-col justify-evenly items-center gap-5 py-5 ">
              <div className="h-1/3">
                <PieChart chartData={coursesData} />
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
