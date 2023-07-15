import React from "react";

import { Link } from "react-router-dom";
import {
  ClockIcon,
  Square3Stack3DIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
const CourseCardV2 = ({ courseID, courseImage, courseTitle }) => {
  console.log(courseImage);
  return (
    <div className="group relative flex flex-col items-center w-full h-full bg-opacity-20  rounded-xl m-3 bg-slate-300 shadow-slate-300 shadow-lg ">
      <img
        // src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${courseImage}`}
        src={`http://localhost:4000/s3Direct/${courseImage}`}
        alt="course image"
        className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"
      />
      <p className="text-sm tablet:text-xs laptop:text-sm font-bold flex-row-centered bg-slate-500 text-white capitalize px-4 h-8 pt-0.5 mt-[203px] tablet:mt-[165px] laptop:mt-[203px]  absolute  text-center rounded-full ">
        {courseTitle}
      </p>
      <div className="flex flex-row justify-evenly items-start pt-8 w-full  h-[110px] rounded-b-xl">
        <div className="group flex-col-centered  rounded-lg h-12 px-2 ">
          <Square3Stack3DIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {50} units
          </span>
        </div>
        <div className="group flex-col-centered  rounded-lg h-12 px-2 ">
          <ClockIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {50} hours
          </span>
        </div>
        <div className="group flex-col-centered rounded-lg h-12 px-2 ">
          <PresentationChartLineIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {50} lessons
          </span>
        </div>
      </div>
      <Link to={`/course/${courseID}`}>
        <button className="absolute bottom-0 right-0 flex flex-row justify-center items-center hover:pl-7  gap-2 group hover:font-bold hover:gap-4 text-sm h-8  font-extralight capitalize w-48 tablet:w-40 laptop:w-44 bg-slate-600 hover:bg-slate-800  text-white rounded-br-xl rounded-tl-xl ">
          <span>Go to Course</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default CourseCardV2;
