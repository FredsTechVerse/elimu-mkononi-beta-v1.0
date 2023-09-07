import React from "react";
import {
  NavBgBtn,
  CourseCardV2,
  CourseSkeleton,
  PageTitle,
  HomeBtn,
  NavMenuBtn,
  DashboardUserButton,
  ErrorMessage,
} from "../../components";
import { useLocation, useOutletContext } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchCoursesData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CoursesAdminPage = () => {
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const coursesQuery = useQuery(["courses"], fetchCoursesData, {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });
  const { isSideBarOpen, toggleSideBar } = useOutletContext();

  return (
    <div className="w-full laptop:w-3/4 flex flex-col gap-5 relative phone:rounded-lg justify-start  h-full overflow-auto p-3 overflow-x-hidden ">
      <div className=" absolute z-10 top-2 right-1 tablet:right-2 flex-row-centered gap-2">
        <NavBgBtn to="/new-course" text="Add Course" />
      </div>
      <div className="absolute top-2 left-1 w-max px-2">
        <PageTitle title="list of courses" />
      </div>

      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>

      <div className="w-full flex flex-col  justify-start pt-8">
        {coursesQuery.status === "loading" && (
          <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-3 tablet:gap-6  ">
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </div>
        )}
        {coursesQuery.data && coursesQuery?.data.length > 0 ? (
          <div className="grid-lg tablet:grid-cols-2 laptop:grid-cols-3 tablet:gap-6 ">
            {coursesQuery.data.map((course, index) => {
              return <CourseCardV2 key={index} courseData={course} />;
            })}
          </div>
        ) : (
          <ErrorMessage message="No courses data" />
        )}
      </div>
    </div>
  );
};

export default CoursesAdminPage;
