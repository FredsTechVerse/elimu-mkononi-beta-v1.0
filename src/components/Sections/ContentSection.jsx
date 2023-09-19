import React, { useEffect } from "react";
import { ContentSectionSkeleton, FancyMessage } from "../../components";
import { VideoPlayer, UnitNav } from "../../components";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError, fetchUnitData } from "../../controllers";

const ContentSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const { unitID } = useParams();
  const { openSideBar, sideBarOpen } = useOutletContext();
  const { updateCurrentLesson } = useCurrentLessonContext();
  const { currentLesson } = useCurrentLessonContext();
  const unitDataQuery = useQuery(
    ["unitData", unitID],
    () => fetchUnitData({ unitID }),
    {
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["unitData", unitID]);
        }
      },
    }
  );
  useEffect(() => {
    if (unitDataQuery?.status === "success") {
      updateCurrentLesson({
        ...unitDataQuery.data?.unitChapters[0]?.chapterLessons[0],
      });
    }
  }, [unitDataQuery?.status]);

  if (unitDataQuery.status === "loading") {
    return <ContentSectionSkeleton />;
  } else if (unitDataQuery?.status === "success" && currentLesson?.lessonUrl) {
    return (
      <div className="w-full flex flex-col gap-1">
        <UnitNav
          openSideBar={openSideBar}
          sideBarOpen={sideBarOpen}
          unitData={unitDataQuery.data}
        />
        <VideoPlayer />
        <div className="border-none border-slate-400 rounded-lg w-full">
          <Outlet context={{ sideBarOpen, openSideBar }} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <FancyMessage message="No lesson present" />;
        <button
          class={`${
            sideBarOpen && "hidden"
          } laptop:hidden absolute top-1 left-2 bg-primary hover:bg-purple-500 text-sm text-white h-8 rounded-lg p-2 flex flex-row items-center justify-center`}
          onClick={openSideBar}
        >
          Open Sidebar
        </button>
      </div>
    );
  }
};

export default ContentSection;
