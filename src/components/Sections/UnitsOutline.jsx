import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnitCard, UnitSkeleton, NavigateBtn, ReturnBackBtn } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseData } from "../../api/get";
const UnitsOutline = () => {
  const { courseID } = useParams();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const courseQuery = useQuery({
    queryKey: ["courseData", courseID],
    queryFn: () => fetchCourseData(courseID),
  });
  return (
    <div className="w-full h-full flex flex-col bg-slate-100 ">
      <div className=" relative pattern h-48 flex-row-centered">
        <p className="text-white font-bold text-center phone:text-xl tablet:text-2xl laptop:text-4xl uppercase w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-10">
          {courseQuery?.data && courseQuery?.data?.courseTitle}
        </p>
        {(roles?.includes("EM-202") || roles?.includes("EM-203")) && (
          <div className="absolute bottom-3 left-1 flex gap-1">
            <NavigateBtn destination="new-unit" text="New Unit" />
            <NavigateBtn destination="assign-unit" text="Assign Unit" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center py-2 w-full h-full overflow-auto">
        <div className="w-full h-full flex-col-centered p-4 ">
          <div className="text-2xl font-bold text-slate-500 my-2 font-sans">
            LIST OF UNITS
          </div>

          {courseQuery.status === "loading" ? (
            <div className="grid-sm w-full h-full overflow-hidden">
              <UnitSkeleton />
              <UnitSkeleton />
              <UnitSkeleton />
            </div>
          ) : courseQuery.status === "error" ? (
            <p className="bg-red-300 rounded-lg p-4">
              {courseQuery.error.message}
            </p>
          ) : (
            <div className="grid-sm w-full h-full overflow-auto ">
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

export default UnitsOutline;
