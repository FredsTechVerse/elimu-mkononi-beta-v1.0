import React, { useState, useEffect } from "react";
import {
  UserProfile,
  DashboardUserButton,
  PieChart,
  AreaChart,
  UserProfileSkeleton,
  TableSkeleton,
  TutorUnitsTable,
} from "../../components";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails } from "../../controllers/fetchData";

const TutorDashboard = () => {
  const [userData, setUserData] = useState({});
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const role = "EM-202";

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onSuccess: (data) => {
      setUserData(data);
      console.log(data);
      // Extracting the total number of lessons
      let totalLessons = 0;
      data?.units?.forEach((unit) => {
        unit.unitChapters.forEach((chapter) => {
          totalLessons += chapter.chapterLessons.length;
        });
      });

      // Extracting the total number of units
      let totalUnits = data?.units?.length;

      // Outputting the results
      console.log("Total Lessons:", totalLessons);
      console.log("Total Units:", totalUnits);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        console.log("Retrying the fetch");
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  useEffect(() => {
    // console.log(`User data : ${JSON.stringify(userData)}`);
  }, [userData]);

  console.log(`Tutor data ${JSON.stringify(userData)}`);
  return (
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row  ">
      <div className="w-1/4 phone:hidden laptop:flex flex-col h-full justify-between p-2">
        {userDataQuery.status === "loading" ? (
          <UserProfileSkeleton />
        ) : (
          <UserProfile
            name={`${userDataQuery?.data?.firstName}  ${userDataQuery?.data?.surName} `}
            role="tutor"
          />
        )}
        <div className="controls w-full h-full flex-col-centered gap-2 ">
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
      <div className="w-full laptop:w-3/4  flex flex-col justify-start h-full overflow-auto  p-3 ">
        <div className="w-full flex phone:flex-col tablet:flex-row justify-between items-center gap-5">
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
        <div className="flex phone:flex-col tablet:flex-row w-full gap-5 ">
          <div className=" h-full w-full tablet:w-2/3 mt-5 gap-5  flex flex-col items-center justify-start   rounded-xl">
            <div className=" phone:h-[250px] tablet:h-[370px] w-full laptop:h-[850px]  p-2  flex-col-centered  graph  rounded-xl">
              <AreaChart />
            </div>

            <div className="content p-2 m-2 rounded-xl w-full h-full flex-row-centered bg-slate-200 ">
              {userDataQuery.status === "loading" ? (
                <TableSkeleton />
              ) : (
                <TutorUnitsTable />
              )}
            </div>
          </div>
          <div className="phone:w-full tablet:w-1/3  ">
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

export default TutorDashboard;
