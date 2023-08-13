import React from "react";
import {
  NavBgBtn,
  CourseCardV2,
  CourseSkeleton,
  PageTitle,
  BackBtn,
} from "../../components";
import { useLocation } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchCoursesData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CoursesAdminPage = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const coursesQuery = useQuery(["courses"], fetchCoursesData, {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });
  return (
    <div className="flex flex-col gap-5 relative phone:rounded-lg w-full h-full px-4">
      <div className="absolute top-2 left-2 z-10">
        <BackBtn isDark={true} />
      </div>

      <div className="absolute top-2 right-2 ">
        <NavBgBtn to="/new-course" text="Add Course" isBlue={true} />
      </div>
      <div className="relative top-2">
        <PageTitle title="list of courses" />
      </div>

      <div className="w-full flex flex-col  justify-start">
        {coursesQuery.status === "loading" && (
          <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-4 tablet:gap-6 ">
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </div>
        )}
        {coursesQuery.data && coursesQuery?.data.length > 0 && (
          <div className="grid-lg">
            {coursesQuery.data.map((course, courseIndex) => {
              return <CourseCardV2 key={courseIndex} courseData={course} />;
            })}
          </div>
        )}

        {coursesQuery.data && coursesQuery?.data.length == 0 && (
          <div className="w-full h-full relative flex-row-centered ">
            <p className="my-10 p-3 text-center bg-slate-400 bg-opacity-40 rounded-lg">
              No courses have been found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesAdminPage;
