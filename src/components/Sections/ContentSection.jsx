import React, { useEffect } from "react";
import { ContentSectionSkeleton } from "../../components";
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
  if (unitDataQuery?.status === "success") {
    console.log({ unitData: unitDataQuery.data });
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
    return <ContentSectionSkeleton />;
  }
};

export default ContentSection;
