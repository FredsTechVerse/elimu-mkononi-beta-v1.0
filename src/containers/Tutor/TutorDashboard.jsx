import React, { useState, useEffect } from "react";
import {
  UserProfile,
  DashboardUserButton,
  PieChart,
  AreaChart,
  UserProfileSkeleton,
  TableSkeleton,
  TutorUnitsTable,
  PageTitle,
  HomeBtn,
  BackBtn,
  DoughnutChart,
  DoughnutSkeleton,
} from "../../components";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails } from "../../controllers/fetchData";

const TutorDashboard = () => {
  const [pieChartData, setPieChartData] = useState({
    labels: ["Total Units", "Total Lessons"],
    datasets: [
      {
        label: "Workload",
        data: [0, 0],
        backgroundColor: ["green", "blue"],
        borderColor: ["green", "blue"],
      },
    ],
  });

  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const role = "EM-202";

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onSuccess: (data) => {
      let totalUnits = data?.units?.length;
      let totalLessons = 0;
      data?.units?.forEach((unit) => {
        unit.unitChapters.forEach((chapter) => {
          totalLessons += chapter?.chapterLessons?.length;
        });
      });
      // console.log(`Query successfull ${JSON.stringify(data)}`);

      setPieChartData({
        labels: ["Total Units", "Total Lessons"],
        datasets: [
          {
            label: "Workload",
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

  return (
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row  ">
      <div className="w-1/4 phone:hidden laptop:flex flex-col h-full justify-between gap-3 p-2">
        <div>
          {userDataQuery.status === "loading" ? (
            <UserProfileSkeleton />
          ) : (
            <UserProfile
              name={`${userDataQuery?.data?.firstName}  ${userDataQuery?.data?.surname} `}
              role="tutor"
            />
          )}
        </div>
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
      <div className="w-full laptop:w-3/4  flex flex-col justify-start h-full overflow-auto p-3 ">
        <div className="w-full flex phone:flex-col tablet:flex-row justify-between items-center gap-5">
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
        <div className="flex phone:flex-col tablet:flex-row w-full gap-5 ">
          <div className=" h-full w-full tablet:w-2/3 mt-5 gap-5  flex flex-col items-center justify-start   rounded-xl">
            <div className="phone:h-[250px] tablet:h-[370px] w-full gap-2 laptop:h-[850px]  p-2  flex-col-centered  graph  rounded-xl">
              <PageTitle text="Traffic data" />
              <AreaChart />
            </div>

            <div className="content p-2 m-2 rounded-xl w-full h-full flex flex-col justify-start items-center ">
              {userDataQuery.status === "loading" ? (
                <TableSkeleton />
              ) : (
                <div className="flex-col-centered gap-5">
                  <PageTitle text="List of units" />
                  <TutorUnitsTable unitsData={userDataQuery?.data?.units} />
                </div>
              )}
            </div>
          </div>
          <div className="phone:w-full tablet:w-1/3  ">
            <div className="flex flex-col justify-evenly items-center gap-5 py-5 ">
              <div className="h-1/3">
                {userDataQuery.status === "loading" && <DoughnutSkeleton />}
                {userDataQuery.status === "success" && (
                  <DoughnutChart chartData={pieChartData} />
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

export default TutorDashboard;
