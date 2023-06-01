import axios from "../../axios";
import React, { useEffect, useState } from "react";
import {
  NavigateBtn,
  CourseAdminCard,
  CourseForm,
  PageTitle,
} from "../../components";

const CoursesAdminPage = () => {
  const [coursesData, setCoursesData] = useState([]);
  const fetchCoursesData = async () => {
    try {
      const { data: coursesData } = await axios.get("/course/all-courses");
      console.log(coursesData);
      setCoursesData(coursesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoursesData();
  }, []);
  // LIST OF CARDS.
  return (
    <div className="flex flex-col align-center relative shadow-md phone:rounded-lg w-full h-full pt-2 px-4">
      <div className="flex w-full items-center justify-end mb-3 pr-1">
        <NavigateBtn destination="new-course" text="New Course" />
      </div>

      <PageTitle text="list of courses" />

      <div className="w-full flex flex-col justify-start items-center ">
        <div className="grid-display gap-5">
          {coursesData &&
            coursesData.map((course, courseIndex) => {
              const { _id, courseTitle, courseImage } = course;
              return (
                <CourseAdminCard
                  key={courseIndex}
                  courseID={_id}
                  courseTitle={courseTitle}
                  courseImage={courseImage}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CoursesAdminPage;
