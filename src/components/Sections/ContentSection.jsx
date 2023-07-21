import React from "react";

import { VideoSection, UnitNav, MenuBtn } from "../../components";
import { UnitOverview } from "../../containers";
import { Outlet } from "react-router-dom";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
const ContentSection = ({ unitData, openSideBar, sideBarOpen, unitID }) => {
  const { currentLesson } = useCurrentLessonContext();
  if (currentLesson.videoKind === "youtube#video") {
    return (
      <div className="w-full px-1">
        <UnitNav
          lessonName={currentLesson?.lessonName}
          openSideBar={openSideBar}
          sideBarOpen={sideBarOpen}
        />
        <VideoSection />
        <div className="border-none border-slate-400 rounded-lg w-full">
          <Outlet
            context={{
              unitData: unitData,
              openSideBar: openSideBar,
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
