import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCourse, handleError } from "../../controllers";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  ClockIcon,
  Square3Stack3DIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
const CourseCardV2 = ({ courseData }) => {
  const location = useLocation();
  const roles = JSON.parse(localStorage.getItem("roles"));
  let totalCourseUnits = 0;
  let totalCourseChapters = 0;
  let totalCourseLessons = 0;
  const isTutor = roles?.includes("EM-202");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [isDeleteQueryEnabled, setIsDeleteQueryEnabled] = useState(false);

  useQuery(
    ["deletedCourse", courseData?._id],
    () => deleteCourse({ courseID: courseData?._id }),
    {
      enabled: isDeleteQueryEnabled,
      staleTime: 0,
      onSuccess: () => {
        updateAlertBoxData({
          response: "Deleted course successfully",
          isResponse: true,
          status: "success",
          timeout: 2500,
        });
        setIsDeleteQueryEnabled(false);
        queryClient.invalidateQueries(["courses"], { exact: true });
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["deletedCourse", courseData?._id]);
        }
      },
    }
  );
  const handleClick = () => {
    if (!roles?.includes("EM-202")) {
      navigate(`/course/${courseData?._id}`);
    }
  };

  if (courseData) {
    totalCourseUnits = courseData?.units?.length;
    courseData?.units?.map((unit) => {
      totalCourseChapters += unit?.unitChapters?.length;
      unit?.unitChapters?.map((chapter) => {
        totalCourseLessons += chapter?.chapterLessons?.length;
      });
    });
  }

  return (
    <div className="group relative flex flex-col items-center w-full h-full bg-opacity-20  rounded-xl m-3 bg-slate-300 shadow-slate-300 shadow-lg ">
      <img
        src={`https://elimu-mkononi.s3.af-south-1.amazonaws.com/${courseData?.courseImage}`}
        alt="course image"
        className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"
        onClick={handleClick}
      />
      <p className="text-sm tablet:text-xs laptop:text-sm font-bold flex-row-centered bg-slate-600 text-white capitalize px-4 h-7 mt-[203px] tablet:mt-[165px] laptop:mt-[203px]  absolute  text-center rounded-full ">
        {courseData?.courseTitle}
      </p>
      <div
        className={`flex flex-row justify-evenly items-start pt-8 w-full ${
          roles?.includes("EM-202") ? "h-[80px]" : "h-[110px]"
        } rounded-b-xl`}
      >
        <div className="group flex-col-centered  rounded-lg h-12 px-2 ">
          <Square3Stack3DIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {totalCourseUnits} units
          </span>
        </div>

        <div className="group flex-col-centered rounded-lg h-12 px-2 ">
          <PresentationChartLineIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {totalCourseChapters} chapters
          </span>
        </div>
        <div className="group flex-col-centered  rounded-lg h-12 px-2 ">
          <ClockIcon className="icon-styling text-slate-800" />
          <span className="number font-extralight text-md text-black">
            {totalCourseLessons} lessons
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 flex gap-2 items-center">
        <button
          className={`${
            roles?.includes("EM-203") ? "cta-btn group" : "hidden"
          }`}
          onClick={() => {
            setIsDeleteQueryEnabled(true);
          }}
        >
          <TrashIcon className="icon-styling h-3 laptop:h-4 text-white" />
        </button>

        <button
          className={`${
            roles?.includes("EM-203") ? "cta-btn group " : "hidden"
          }`}
          onClick={() => {
            navigate("/new-course", {
              state: { courseID: courseData?._id, background: location },
            });
          }}
        >
          <PencilIcon className="icon-styling h-3 laptop:h-4  text-white" />
        </button>
        <button
          onClick={handleClick}
          className={`${
            isTutor ? "hidden" : "flex"
          } flex-row justify-center items-center hover:pl-7  gap-2 group hover:font-bold hover:gap-4 text-sm h-8  font-extralight capitalize w-48 tablet:w-40 laptop:w-44 bg-slate-600 hover:bg-slate-800  text-white rounded-br-xl rounded-tl-xl `}
        >
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
      </div>
    </div>
  );
};

export default CourseCardV2;
