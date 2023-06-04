import axios from "../../axios";
import React, { useEffect, useState } from "react";
import {
  NavigateBtn,
  CourseCard,
  CourseSkeleton,
  PageTitle,
} from "../../components";

const CoursesAdminPage = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const roles = JSON.parse(localStorage.getItem("roles"));
  const fetchCoursesData = async () => {
    try {
      setFetchingCourses(true);
      const { data } = await axios.get("/course/all-courses");
      console.log(`Course Data ${JSON.stringify(data)}`);
      setCoursesData(data);
      setTimeout(() => {
        setFetchingCourses(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setFetchingCourses(false);
      }, 800);
    }
  };
  useEffect(() => {
    fetchCoursesData();
  }, []);
  return (
    <div className="flex flex-col align-center relative phone:rounded-lg w-full h-full pt-2 px-4">
      <div className="flex w-full items-center justify-end mb-3 pr-1">
        <NavigateBtn destination="new-course" text="New Course" />
      </div>

      <PageTitle text="list of courses" />

      <div className="w-full flex-col-centered justify-start">
        {coursesData?.length > 0 && !fetchingCourses ? (
          <div className="grid-lg">
            {coursesData &&
              coursesData.map((course, courseIndex) => {
                const { _id, courseTitle, courseImage } = course;
                return (
                  <CourseCard
                    key={courseIndex}
                    courseID={_id}
                    courseTitle={courseTitle}
                    courseImage={courseImage}
                  />
                );
              })}
          </div>
        ) : fetchingCourses ? (
          <div className="grid-lg">
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </div>
        ) : (
          <p className=" h-full text-center bg-red-600 bg-opacity-40">
            No courses have been found
            {roles.includes("EM-202") ||
              (roles.includes("EM-203") && (
                <NavigateBtn destination="new-course" text="New Course" />
              ))}
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursesAdminPage;
