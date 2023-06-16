import React, { useEffect, useState } from "react";
import {
  Accordion,
  ReturnBackBtn,
  ContentSection,
  UnitNav,
  HomeBtn,
  MenuBtn,
} from "../../components";
import { Outlet, useParams } from "react-router-dom";
import axios from "../../axios";
const ContentPage = () => {
  const { unitID } = useParams();
  const [unitData, setUnitData] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [areChaptersPresent, setAreChaptersPresent] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    fetchUnitData();
  }, [unitID, formCompleted]);

  useEffect(() => {
    if (currentLesson !== null) {
      setLessonType(identifyLessonType(currentLesson?.lessonUrl));
      console.log(
        `Updated current lesson data ${JSON.stringify(currentLesson)}`
      );
    }
  }, [currentLesson]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("formCompleted") === "true") {
      setFormCompleted(true);
    }
  }, [location.search]);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  console.log(`Original Data ${JSON.stringify(currentLesson)}`);

  const fetchUnitData = async () => {
    try {
      const { data, status } = await axios.get(`/unit/${unitID}`);

      if (status == 200) {
        if (data) {
          setUnitData(data);
        }
        if (data?.UnitChapters?.length > 0) {
          setAreChaptersPresent(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCurrentLesson = (newLessonData) => {
    if (newLessonData !== null) {
      setCurrentLesson(newLessonData);
    }
  };

  const identifyLessonType = (lessonUrl) => {
    const lessonType = lessonUrl.split(".")[1];
    return lessonType;
  };

  if (Object.keys(unitData).length > 0) {
    return (
      <main className="flex relative tablet:grid  tablet:grid-cols-3 laptop:grid-cols-4 w-full h-screen">
        <article
          className={` ${
            sideBarOpen ? "block" : "hidden"
          }   w-full h-full absolute tablet:relative tablet:block  tablet:col-span-1 `}
        >
          <Accordion
            unitData={unitData}
            fetchUnitData={fetchUnitData}
            updateCurrentLesson={updateCurrentLesson}
            closeSideBar={closeSideBar}
          />
        </article>

        <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex px-2 flex-col rounded-lg pb-2">
          {/* LESSON HEADING */}
          <div className=" flex w-full text-lg text-center text-white my-2 py-1 bg-primary rounded-lg justify-between px-2 ">
            {/* <div className="debug inline">
              <LogoutBtn />
            </div> */}
            <span>{currentLesson?.lessonName}</span>
            <div className="flex-row-centered gap-1">
              <HomeBtn />
              <MenuBtn openSideBar={openSideBar} sideBarOpen={sideBarOpen} />
            </div>
          </div>
          {currentLesson && lessonType === "mp4" ? (
            <>
              {/* LESSON VIDEO */}
              <ContentSection
                lessonIndex={currentLesson?.lessonIndex}
                chapterIndex={currentLesson?.chapterIndex}
                lessonName={currentLesson?.lessonName}
                updateCurrentLesson={updateCurrentLesson}
                currentLessonData={currentLesson}
                // currentLessonUrl={currentLesson?.lessonUrl}
                // lessonName={currentLesson?.lessonName}
              />
              {/* LESSON RESOURCES */}
              <div className="border-none border-slate-400 rounded-lg w-full">
                <UnitNav />
                <Outlet
                  context={{
                    currentLesson: currentLesson,
                    unitData: unitData,
                    fetchUnitData: fetchUnitData,
                    updateCurrentLesson: updateCurrentLesson,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full flex-col-centered bg-slate-400 bg-opacity-30 rounded-lg p-3">
                <p className="text-center uppercase py-3 rounded-lg">
                  No lesson has been selected. Open sidebar to select a lesson
                  and get started.
                </p>
                <button
                  onClick={openSideBar}
                  className="text-lg capitalize px-2 w-36 m-3 py-2 rounded-md bg-primary hover:bg-purple-600 text-white text-center tablet:hidden"
                >
                  Open SideBar
                </button>
              </div>
            </>
          )}
        </article>
      </main>
    );
  } else if (Object.keys(unitData).length === 0) {
    return (
      <div className="w-full h-screen flex-col-centered">
        This unit is yet to be populated
        <ReturnBackBtn />
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex-col-centered">
        Something wrong happened
        <ReturnBackBtn />
      </div>
    );
  }
};

export default ContentPage;
