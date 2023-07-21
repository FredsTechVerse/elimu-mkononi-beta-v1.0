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
  MenuBtn,
} from "../../components";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails } from "../../controllers/fetchData";

const TutorDashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openSideBar = () => {
    setIsSideBarOpen(true);
  };
  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };
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
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row relative ">
      <div
        className={`   ${
          isSideBarOpen
            ? "phone:absolute z-10 m-3 rounded-lg bg-slate-200 phone:h-full tablet:h-80 laptop:h-full  phone:w-full tablet:w-80"
            : "phone:hidden"
        } laptop:relative laptop:w-1/4 laptop:flex flex-col laptop:h-full justify-between gap-2 p-2`}
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
        <div className="w-full flex-col-centered gap-1 rounded-lg  ">
          <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
            Quick Access Controls
          </h1>
          <div className="gap-2 p-2 grid grid-cols-2  h-56 w-full">
            <DashboardUserButton user="chapter" />
            <DashboardUserButton user="lesson" />
            <DashboardUserButton user="resource" />
            <DashboardUserButton user="information" />
          </div>
        </div>
      </div>
      <div className="w-full laptop:w-3/4  flex flex-col justify-start h-full overflow-auto overflow-x-hidden p-3 gap-3 ">
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
        <div className="flex phone:flex-col tablet:flex-col w-full gap-5  border-black  ">
          <div className=" h-full w-full tablet:w-full gap-5  flex flex-col items-center justify-start  rounded-xl">
            <div className=" phone:h-[250px] tablet:h-[450px] w-full gap-2 laptop:h-[600px]  p-2  flex flex-col justify-start graph  rounded-xl">
              <PageTitle text="Units Uploaded" />
              <AreaChart />
            </div>
            <div className=" phone:w-full gap-5  flex phone:flex-col tablet:flex-row tablet:w-full tablet:justify-between  ">
              <div className="bg-slate-300 rounded-lg phone:h-64 tablet:h-full phone:w-full tablet:w-2/3 "></div>
              <div className="tablet:h-full phone:w-full tablet:w-1/3 flex-row-centered">
                {userDataQuery.status === "loading" && <DoughnutSkeleton />}
                {userDataQuery.status === "success" && (
                  <DoughnutChart
                    chartData={pieChartData}
                    doughnutName="workload"
                    doughnutValue="50"
                  />
                )}
              </div>
            </div>

            <div className="content p-2 m-2 rounded-xl w-full   flex flex-col justify-start ">
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
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
