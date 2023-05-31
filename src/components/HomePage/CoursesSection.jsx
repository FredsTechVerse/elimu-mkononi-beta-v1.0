import React, { useState, useEffect } from "react";
import { CourseCard } from "../../components";

import axios from "../../axios";

const CoursesSection = () => {
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const { data: coursesData } = await axios.get("/course/all-courses");
        setCoursesData(coursesData);
      } catch (error) {
        // There is need to handle the network error accordingly.
        console.error(error);
      }
    };

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
        <div className="grid-display p-2">
          {coursesData.map((course, courseIndex) => {
            return <CourseCard key={courseIndex} course={course} />;
          })}
        </div>
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
