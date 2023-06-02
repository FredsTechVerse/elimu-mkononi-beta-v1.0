import React, { useState, useEffect } from "react";
import { CourseCard, CourseSkeleton } from "..";
import axios from "../../axios";

const CoursesSection = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const fetchCoursesData = async () => {
    try {
      setFetchingCourses(true);
      const { data: coursesData } = await axios.get("/course/all-courses");
      setCoursesData(coursesData);
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
    <div
      id="courses"
      className="courses relative  p-2 w-full text-slate-900 bg-white"
    >
      <h3 className="text-6xl font-bold text-center mt-3">Get Started</h3>
      <p className="mb-6 text-center">Explore the courses</p>
      <div className="flex-col-centered w-full pb-6">
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
          </div>
        ) : (
          <p className=" h-full text-center bg-red-600 bg-opacity-40">
            No courses have been found
          </p>
        )}
      </div>
      <div className="custom-shape-divider-bottom-1679516065">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 0 598.97 114.72 1200 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default CoursesSection;
