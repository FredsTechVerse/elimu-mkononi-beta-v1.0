import React, { useEffect, useState } from "react";
import {
  TutorAccordion,
  ReturnBackBtn,
  ContentSection,
  UnitNav,
} from "../../components";
import { Outlet, useParams, Link } from "react-router-dom";
import axios from "../../axios";
const ContentPage = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const { unitID } = useParams();
  const [unitData, setUnitData] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    fetchUnitData();
  }, [unitID]);

  useEffect(() => {
    if (currentLesson !== null) {
      lessonType(currentLesson.lessonUrl);
    }
  }, [currentLesson]);

  /**The unit data returned contains info about the chapters and their respective lessons  */
  const fetchUnitData = async () => {
    try {
      const { data, status } = await axios.get(`/unit/${unitID}`);

      if (status == 200) {
        setUnitData(data);
      }
    } catch (error) {
      console.log(`Error while trying to fetch data ${JSON.stringify(error)}`);
    }
  };

  const updateCurrentLesson = (newLessonData) => {
    if (newLessonData !== null) {
      setCurrentLesson(newLessonData);
      console.log(
        `Current lesson data changed to ${JSON.stringify(currentLesson)}`
      );
    }
  };

  const lessonType = (lessonUrl) => {
    if (lessonUrl !== null) {
      const lessonType = lessonUrl.split(".")[1];
      return lessonType;
    }
  };

  // For admin on the ground i want him to be given the real situation on the ground .
  if (roles[0] === "EM-202" || roles[0] === "EM-203") {
    if (unitData !== null) {
      //THE TUTOR & ADMIN SHOULD BE ABLE TO SEE THE SITUATION AS IT IS ON THE GROUND.
      return (
        <main className="grid phone:grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 w-full h-screen  overflow-auto">
          <article className=" phone: hidden col-span-1 order-2 tablet:order-1  h-full tablet:flex flex-col rounded-lg laptop:overflow-y-auto px-2 ">
            <TutorAccordion
              unitData={unitData}
              fetchUnitData={fetchUnitData}
              updateCurrentLesson={updateCurrentLesson}
            />
          </article>
          <article className="phone:col-span-1 order-1 tablet:order-2 laptop:col-span-3 tablet:col-span-2 h-full laptop:overflow-y-auto flex px-2 flex-col rounded-lg pb-2">
            <div className="w-full text-lg text-center text-white my-2 py-2 bg-primary rounded-lg">
              NAVBAR WITH ICONS
            </div>
            <ContentSection
              currentLesson={currentLesson}
              lessonType={lessonType}
            />
            <div className="border-none border-slate-400 rounded-lg w-full">
              <UnitNav />
              <Outlet
                context={{
                  currentLesson,
                  unitData,
                  fetchUnitData: fetchUnitData,
                  updateCurrentLesson: updateCurrentLesson,
                }}
              />
            </div>
          </article>
        </main>
      );
    }
  } else if (roles[0] === "EM-201") {
    return (
      <div className="w-full h-screen flex-col-centered">
        This unit is yet to be populated
        <ReturnBackBtn />
      </div>
    );
  }
};

export default ContentPage;
