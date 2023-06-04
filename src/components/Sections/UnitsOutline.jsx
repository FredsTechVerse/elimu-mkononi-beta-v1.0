import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnitCard, UnitSkeleton, NavigateBtn, ReturnBackBtn } from "..";
import axios from "../../axios";
const UnitsOutline = () => {
  const { courseId } = useParams();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [courseData, setCourseData] = useState({});
  const [fetchingUnits, setFetchingUnits] = useState(false);
  const fetchCourseData = async () => {
    try {
      setFetchingUnits(true);
      const { data } = await axios.get(`/course/${courseId}`);
      setCourseData(data);
      setTimeout(() => {
        setFetchingUnits(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setFetchingCourses(false);
      }, 800);
    }
  };
  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 ">
      <div className=" relative pattern h-48 flex-row-centered">
        <p className="text-white font-bold text-center phone:text-xl tablet:text-2xl laptop:text-4xl uppercase w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-10">
          {JSON.stringify(courseData) !== "{}" && courseData.courseTitle}
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
          {courseData?.units?.length > 0 && !fetchingUnits ? (
            <div className=" grid-sm w-full h-full overflow-auto ">
              {courseData.units.map((unit, index) => {
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
              })}
            </div>
          ) : fetchingUnits === true ? (
            <div className="grid-sm w-full h-full overflow-hidden">
              <UnitSkeleton />
              <UnitSkeleton />
              <UnitSkeleton />
            </div>
          ) : (
            <p className="h-full text-center">
              This course is yet to be populated
              <ReturnBackBtn />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitsOutline;
