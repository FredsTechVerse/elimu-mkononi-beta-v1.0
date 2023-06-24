import { useParams } from "react-router-dom";
import {
  UnitCard,
  UnitSkeleton,
  NavigateBtn,
  PageTitle,
  BackBtn,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseData } from "../../controllers/fetchData";
const CourseOverview = () => {
  const { courseID } = useParams();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const courseQuery = useQuery({
    queryKey: ["courseData", courseID],
    queryFn: () => fetchCourseData(courseID),
  });

  return (
    <div className="w-full flex flex-col bg-slate-100">
      <div className="relative pattern h-60 w-full">
        <div className="flex flex-col items-start justify-center w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-20">
          <p className="mx-auto text-white  font-bold  phone:text-xl tablet:text-2xl laptop:text-4xl uppercase">
            {courseQuery?.data &&
              `${courseQuery?.data?.courseTitle} - LIST OF
            UNITS `}
          </p>
        </div>
        {(roles?.includes("EM-202") || roles?.includes("EM-203")) && (
          <>
            <div className="absolute top-2 right-2 flex gap-1">
              <NavigateBtn destination="new-unit" text="New Unit" />
            </div>
            <div className="absolute top-2 left-2 flex gap-1">
              <BackBtn />
            </div>
          </>
        )}
        <div className="absolute h-7 bg-slate-100 w-full bottom-0 rounded-t-full">
          {/* <PageTitle text="Units in this course" /> */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-6 w-full">
        <div className="w-full h-full flex flex-col items-center px-2 ">
          {courseQuery.status === "loading" ? (
            <div className="grid-sm w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <UnitSkeleton key={index} />
              ))}
            </div>
          ) : courseQuery.status === "error" ? (
            <p className="bg-red-300 rounded-lg p-4">
              {courseQuery.error.message}
            </p>
          ) : (
            <div className="grid-sm w-full ">
              {courseQuery.data.units.length > 0 ? (
                courseQuery?.data?.units.map((unit, index) => {
                  const { unitName, unitDescription, _id } = unit;
                  return (
                    <UnitCard
                      unitID={_id}
                      key={index}
                      unitNumber={`${index + 1}`}
                      unitName={unitName}
                      unitDescription={unitDescription}
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
