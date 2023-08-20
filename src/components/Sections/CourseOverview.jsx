import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  UnitCard,
  UnitSkeleton,
  NavigateBtn,
  BackBtn,
  Heading,
} from "../../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourseData, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const CourseOverview = () => {
  const { courseID } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const queryClient = useQueryClient();
  const location = useLocation();
  const courseQuery = useQuery(
    ["courseData", courseID],
    () => fetchCourseData({ courseID }),
    {
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["courseData", courseID]);
        }
      },
    }
  );

  return (
    <div className="w-full flex flex-col bg-slate-100 ">
      <div className="relative pattern h-60 w-full">
        <div className="flex flex-col items-start justify-center w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-20">
          <p className="mx-auto text-white  font-bold  phone:text-xl tablet:text-2xl laptop:text-4xl uppercase">
            {courseQuery?.data && courseQuery?.data?.courseTitle}
          </p>
        </div>
        {(roles?.includes("EM-202") || roles?.includes("EM-203")) && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Link
              to="/new-unit"
              state={{ background: location, courseID: courseID }}
            >
              <div className="capitalize flex-row-centered gap-1 text-white bg-primary w-32 rounded-full h-8  px-0.5 ">
                Add Unit
              </div>
            </Link>
          </div>
        )}

        <div className="absolute top-2 left-2 flex gap-1">
          <BackBtn />
        </div>
        <div className="absolute h-7 bg-slate-100 w-full bottom-0 rounded-t-full"></div>
      </div>
      <div className="flex flex-col items-center gap-3 justify-start w-full">
        <Heading heading="Course Description" />
        <p className="px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolore
          odio sapiente animi sit? Adipisci odio doloribus eaque, consectetur,
          velit ducimus inventore amet quibusdam veritatis laudantium magnam
          quisquam voluptatibus iste doloremque officiis a similique dolor
          recusandae in non facere alias, explicabo rem? Quos aliquid animi
          iusto sint autem nihil consectetur a nisi, illo fugiat placeat culpa
          modi repellendus, deserunt sed aspernatur vitae sapiente doloremque
          eum asperiores odio cupiditate dolor maxime. Quam ut quibusdam
          assumenda officia harum deleniti velit rem atque eaque neque aut ipsum
          doloremque, minima iusto quaerat quisquam? Quasi autem ex facilis,
          aperiam soluta aut quam deleniti esse labore earum exercitationem
          distinctio quae dolore quisquam culpa placeat fuga incidunt.
          Reiciendis itaque qui porro tempora inventore cupiditate, repellat,
          repellendus nesciunt quas atque, laboriosam corporis at dolorum harum
          deserunt natus magnam ipsam eum libero accusamus ipsum! Commodi
          molestiae vero earum beatae labore officia voluptatum illum dolorum.
          Hic fuga ipsam quibusdam omnis nulla inventore qui voluptates
          architecto fugit aliquid veniam commodi, quia, ullam quam tempore,
          quisquam corrupti sint atque modi sed! Rerum odit natus qui magni
          cumque suscipit voluptate rem, similique animi explicabo corrupti
          facere aliquid, magnam culpa quam ad et distinctio optio. Beatae minus
          soluta aliquid distinctio vel laborum fuga dignissimos!
        </p>
        <Heading heading="List of units" />
        <div className="w-full h-full flex flex-col items-center px-2 ">
          {courseQuery.status === "loading" ? (
            <div className="grid-sm w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <UnitSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid-sm w-full ">
              {courseQuery?.data?.units.length > 0 ? (
                courseQuery?.data?.units.map((unit, index) => {
                  const { unitName, unitDescription, _id } = unit;
                  return (
                    <UnitCard
                      unitID={_id}
                      key={index}
                      unitNumber={`${index + 1}`}
                      unitName={unitName}
                      unitDescription={unitDescription}
                      courseID={courseID}
                    />
                  );
                })
              ) : (
                <div className="col-span-3">
                  <p className="bg-blue-300 rounded-lg p-4 text-center">
                    The unit has not yet been populated
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
