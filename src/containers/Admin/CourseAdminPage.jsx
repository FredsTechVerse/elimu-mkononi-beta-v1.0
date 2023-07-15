import React from "react";
import {
  NavigateBtn,
  CourseCardV2,
  CourseSkeleton,
  PageTitle,
} from "../../components";

import { fetchCoursesData } from "../../controllers/fetchData";
import { useQuery } from "@tanstack/react-query";

const CoursesAdminPage = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const coursesQuery = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCoursesData,
  });
  return (
    <div className="flex flex-col align-center relative phone:rounded-lg w-full h-full pt-2 px-4">
      <div className="flex w-full items-center justify-end mb-3 pr-1">
        <NavigateBtn destination="new-course" text="New Course" />
      </div>

      <PageTitle text="list of courses" />

      <div className="w-full flex-col-centered justify-start">
        {coursesQuery.status === "loading" && (
          <div className="grid-lg">
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
              const { _id, courseTitle, courseImage } = course;
              return (
                <CourseCardV2
                  key={courseIndex}
                  courseID={_id}
                  courseTitle={courseTitle}
                  courseImage={courseImage}
                />
              );
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
