import React, { useState } from "react";
import { NavMenuBtn, TutorSideBar } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails, handleError } from "../../controllers";
import TutorSummary from "./TutorSummary";

const TutorDashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [totalLessons, setTotalLessons] = useState(0);
  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const [pieChartData, setPieChartData] = useState(null);

  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const role = "EM-202";

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    onSuccess: (data) => {
      let totalUnits = data?.units?.length;
      let totalLessons = 0;
      data?.units?.forEach((unit) => {
        unit.unitChapters.forEach((chapter) => {
          totalLessons += chapter?.chapterLessons?.length;
        });
      });
      setTotalLessons(totalLessons);
      setPieChartData({
        labels: ["Total Units", "Total Lessons"],
        datasets: [
          {
            label: "Workload",
            data: [totalUnits, totalLessons],
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  return (
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row relative ">
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>
      <TutorSideBar
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        userDataQuery={userDataQuery}
      />
      <TutorSummary
        userDataQuery={userDataQuery}
        pieChartData={pieChartData}
        totalLessons={totalLessons}
      />
    </div>
  );
};

export default TutorDashboard;
