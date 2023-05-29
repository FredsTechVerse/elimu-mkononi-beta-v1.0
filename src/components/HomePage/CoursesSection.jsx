import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          {coursesData.map((course, index) => {
            return (
              <div
                key={`course-${index}`}
                className="relative flex flex-col justify-center items-center max-w-[300px] pb-3 hover:scale-105 ease-in-out duration-300  m-4 rounded-lg shadow-2xl shadow-gray-300 "
              >
                <img
                  src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${course.courseImage}`}
                  className="bg-gray-300 h-48 w-full rounded-t-lg"
                  alt=""
                />
                <div className="absolute w-16 h-6 top-0 left-0 bg-green-500 text-white rounded-tl-lg flex-row-centered">
                  $ 45
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full p-2">
                  <h1 className="text-gray-800 text-start font-bold text-xl capitalize ">
                    {course.courseTitle}
                  </h1>
                  <p className="text-md">45 hours</p>
                  <div className="flex-row-centered w-full">
                    <Link to={`course/${course._id}`}>
                      <button className=" bg-gray-800 text-xs text-white px-4 py-2 rounded capitalize hover:bg-gray-700">
                        View course <span></span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
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
