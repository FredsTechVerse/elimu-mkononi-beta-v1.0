import React, { useEffect } from "react";
import { ContentSectionSkeleton, FancyMessage } from "../../components";
import { VideoPlayer, UnitNav } from "../../components";
import { Outlet, useOutletContext } from "react-router-dom";
import { useCurrentLessonContext } from "../../context/currentLessonContext";

const ContentSection = () => {
  const { unitDataQuery, openSideBar, sideBarOpen } = useOutletContext();
  const { updateCurrentLesson } = useCurrentLessonContext();
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
          <Outlet context={{ openSideBar }} />
        </div>
      </div>
    );
  } else {
    return <FancyMessage message="No lesson present" />;
  }
};

export default ContentSection;
