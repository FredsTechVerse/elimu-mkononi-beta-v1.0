import React from "react";
import { CourseCardV2, CourseSkeleton, FancyMessage, PageTitle } from "..";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchCoursesData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const CoursesSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(["courses"], fetchCoursesData, {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });
  return (
    <div
      id="courses"
      className="courses relative  px-2 w-full text-slate-900 bg-white "
    >
      <PageTitle title="list of courses" />

      {coursesQuery.status === "loading" ? (
        <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-4 tablet:gap-6 ">
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
        </div>
      ) : (
        <div className="w-full pt-2">
          {coursesQuery?.data?.length > 0 ? (
            <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-4 tablet:gap-6   ">
              {coursesQuery.data.map((course, courseIndex) => {
                return <CourseCardV2 key={courseIndex} courseData={course} />;
              })}
            </div>
          ) : (
            <FancyMessage message="Courses not found" />
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
