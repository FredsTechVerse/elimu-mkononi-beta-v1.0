import { VideoSection, UnitNav, MenuBtn } from "../../components";
import { Outlet } from "react-router-dom";
const ContentSection = ({
  currentLesson,
  unitData,
  updateCurrentLesson,
  lessonType,
  openSideBar,
  sideBarOpen,
}) => {
  if (lessonType === "mp4") {
    return (
      <div className="w-full">
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
    <div className="w-full h-full flex-col-centered bg-transparent rounded-lg p-3">
      <p className="text-center py-5 px-3 rounded-lg bg-blue-200">
        No lesson has been selected. Open sidebar to select a lesson and get
        started.
      </p>
      <button
        onClick={openSideBar}
        className="text-lg capitalize px-2 w-36 m-3 py-2 rounded-md bg-primary hover:bg-purple-600 text-white text-center tablet:hidden"
      >
        Open SideBar
      </button>
    </div>
  );
};

export default ContentSection;
