import React, { useEffect, useState } from "react";
import { Accordion, ContentSection } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitData } from "../../api/get";
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
      <p className="flex-col-centered text-center py-3 px-2 bg-blue-400 m-2 rounded-lg h-24 max-w-36 mx-auto my-auto">
        Unit Data is Loading
      </p>
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

      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex px-2 flex-col rounded-lg pb-2">
        <ContentSection
          lessonType={lessonType}
          currentLesson={currentLesson}
          unitData={unitDataQuery.data}
          sideBarOpen={sideBarOpen}
          openSideBar={openSideBar}
          updateCurrentLesson={updateCurrentLesson}
        />
      </article>
    </main>
  );
};

export default ContentPage;
