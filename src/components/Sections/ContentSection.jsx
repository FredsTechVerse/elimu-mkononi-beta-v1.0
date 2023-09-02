import React from "react";
import { ContentSectionSkeleton } from "../../components";
import { VideoPlayer, UnitNav } from "../../components";
import { Outlet, useOutletContext } from "react-router-dom";
const ContentSection = () => {
  const { unitDataQuery, openSideBar, sideBarOpen } = useOutletContext();
  if (unitDataQuery?.status === "success") {
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
