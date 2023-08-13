import React from "react";
import { CourseCardV2, CourseSkeleton, PageTitle } from "..";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError } from "../../controllers/handleErrors";
import { fetchCoursesData } from "../../controllers/fetchData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const CoursesSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
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
      ) : coursesQuery.status === "error" ? (
        <p className="bg-red-300 rounded-lg p-4">
          {JSON.stringify(coursesQuery.error.message)}
        </p>
      ) : (
        <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-4 tablet:gap-6   ">
          {coursesQuery?.data.length > 0 ? (
            coursesQuery.data.map((course, courseIndex) => {
              return <CourseCardV2 key={courseIndex} courseData={course} />;
            })
          ) : (
            <p className=" mx-auto my-auto h-full text-center bg-blue-300 bg-opacity-40">
              No courses have been found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
