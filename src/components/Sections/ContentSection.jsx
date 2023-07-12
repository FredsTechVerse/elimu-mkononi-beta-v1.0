import React from "react";

import { VideoSection, UnitNav, MenuBtn } from "../../components";
import { UnitOverview } from "../../containers";
import { Outlet } from "react-router-dom";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
const ContentSection = ({
  unitData,
  lessonType,
  openSideBar,
  sideBarOpen,
  unitID,
}) => {
  const { currentLesson } = useCurrentLessonContext();

  if (lessonType === "mp4") {
    return (
      <div className="w-full px-1">
        {/* LESSON NAV */}
        <UnitNav
          lessonName={currentLesson?.lessonName}
          openSideBar={openSideBar}
          sideBarOpen={sideBarOpen}
        />
        {/* LESSON VIDEO */}
        <VideoSection />
        {/* LESSON RESOURCES */}
        <div className="border-none border-slate-400 rounded-lg w-full">
          <Outlet
            context={{
              unitData: unitData,
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex-col-centered bg-transparent px-2">
      <UnitOverview
        openSideBar={openSideBar}
        sideBarOpen={sideBarOpen}
        unitID={unitID}
      />
    </div>
  );
};

export default ContentSection;
