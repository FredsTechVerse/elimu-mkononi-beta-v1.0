import React, { useEffect, useState } from "react";
import { Accordion, ContentSection } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitData } from "../../controllers/fetchData";
const ContentPage = () => {
  const { unitID } = useParams();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  useEffect(() => {
    if (currentLesson !== null) {
      identifyAndUpdateLessonType(currentLesson?.lessonUrl);
    }
  }, [currentLesson]);

  const unitDataQuery = useQuery({
    queryKey: ["unitData", unitID],
    queryFn: () => fetchUnitData(unitID),
  });

  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  const updateCurrentLesson = (newLessonData) => {
    if (newLessonData !== null) {
      setCurrentLesson(newLessonData);
    }
  };
  const identifyAndUpdateLessonType = (lessonUrl) => {
    if (lessonUrl) {
      const lessonType = lessonUrl.split(".")[1];
      setLessonType(lessonType);
      return lessonType;
    }
  };

  if (unitDataQuery.status === "loading") {
    return (
      <div className="fixed w-full h-screen flex-row-centered bg-slate-300">
        <p className=" flex-col-centered text-center py-3 px-2 m-2 rounded-lg h-24 text-slate-700 text-3xl  ">
          Unit Data is Loading
        </p>
      </div>
    );
  }

  if (unitDataQuery.status === "error") {
    return (
      <p className="bg-red-300 rounded-lg p-4">
        {JSON.stringify(unitDataQuery.error.message)}
      </p>
    );
  }

  return (
    <main className="flex relative tablet:grid  tablet:grid-cols-3 laptop:grid-cols-4 w-full h-screen">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }   w-full h-full absolute tablet:relative tablet:block  tablet:col-span-1 `}
      >
        <Accordion
          unitData={unitDataQuery.data}
          fetchUnitData={fetchUnitData}
          updateCurrentLesson={updateCurrentLesson}
          closeSideBar={closeSideBar}
        />
      </article>

      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex  flex-col  ">
        <ContentSection
          lessonType={lessonType}
          currentLesson={currentLesson}
          unitData={unitDataQuery.data}
          sideBarOpen={sideBarOpen}
          openSideBar={openSideBar}
          unitID={unitID}
          updateCurrentLesson={updateCurrentLesson}
        />
      </article>
    </main>
  );
};

export default ContentPage;
