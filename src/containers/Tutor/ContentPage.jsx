import React, { useEffect, useState } from "react";
import {
  Accordion,
  ContentSection,
  AccordionSkeleton,
  ContentSectionSkeleton,
} from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitData } from "../../controllers/fetchData";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
const ContentPage = () => {
  const { unitID } = useParams();
  const { currentLesson } = useCurrentLessonContext();

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

  const identifyAndUpdateLessonType = (lessonUrl) => {
    if (lessonUrl) {
      const lessonType = lessonUrl.split(".")[1];
      setLessonType(lessonType);
      return lessonType;
    }
  };

  if (unitDataQuery.status === "loading") {
    return (
      <main className="flex relative tablet:grid  tablet:grid-cols-3 laptop:grid-cols-4 w-full h-screen">
        <article
          className={` ${
            sideBarOpen ? "block" : "hidden"
          }   w-full h-full absolute tablet:relative tablet:block  tablet:col-span-1 `}
        >
          <AccordionSkeleton />
        </article>

        <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex  flex-col  ">
          <ContentSectionSkeleton />
        </article>
      </main>
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
          closeSideBar={closeSideBar}
        />
      </article>

      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex  flex-col  ">
        <ContentSection
          lessonType={lessonType}
          unitData={unitDataQuery.data}
          sideBarOpen={sideBarOpen}
          openSideBar={openSideBar}
          unitID={unitID}
        />
      </article>
    </main>
  );
};

export default ContentPage;
