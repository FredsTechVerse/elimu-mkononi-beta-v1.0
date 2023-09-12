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
  console.log(`Unit ID in content section ${JSON.stringify(unitID)}`);
  const { openSideBar, sideBarOpen } = useOutletContext();
  const { updateCurrentLesson } = useCurrentLessonContext();
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
  } else if (
    unitDataQuery?.status === "success" &&
    unitDataQuery.data?.unitChapters[0]?.chapterLessons.length > 0
  ) {
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
    return <FancyMessage message="No lesson present" />;
  }
};

export default ContentSection;
