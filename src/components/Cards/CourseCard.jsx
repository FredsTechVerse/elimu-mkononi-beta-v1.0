import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="relative flex flex-col justify-center items-center max-w-[300px] pb-3 hover:scale-105 ease-in-out duration-300  m-4 rounded-lg shadow-lg shadow-slate-300 ">
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
};

export default CourseCard;
