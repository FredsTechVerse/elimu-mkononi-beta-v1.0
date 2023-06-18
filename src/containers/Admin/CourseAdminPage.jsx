import {
  NavigateBtn,
  CourseCard,
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
        {coursesQuery.status === "loading" ? (
          <div className="grid-lg">
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
          <div className="grid-lg">
            {coursesQuery?.data.length > 0 ? (
              coursesQuery.data.map((course, courseIndex) => {
                const { _id, courseTitle, courseImage } = course;
                return (
                  <CourseCard
                    key={courseIndex}
                    courseID={_id}
                    courseTitle={courseTitle}
                    courseImage={courseImage}
                  />
                );
              })
            ) : (
              <p className=" h-full text-center bg-blue-300 bg-opacity-40">
                No courses have been found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesAdminPage;
