import React from "react";

import { VideoSection, UnitNav, MenuBtn } from "../../components";
import { UnitOverview } from "../../containers";
import { Outlet } from "react-router-dom";
const ContentSection = ({
  currentLesson,
  unitData,
  updateCurrentLesson,
  lessonType,
  openSideBar,
  sideBarOpen,
  unitID,
}) => {
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
        <VideoSection currentLesson={currentLesson} />
        {/* LESSON RESOURCES */}
        <div className="border-none border-slate-400 rounded-lg w-full">
          <Outlet
            context={{
              unitData: unitData,
              currentLesson: currentLesson,
              updateCurrentLesson: updateCurrentLesson,
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
