import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnitsCard, NavigateBtn, ReturnBackBtn } from "..";
import axios from "../../axios";
const UnitsOutline = () => {
  const { courseId } = useParams();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [courseData, setCourseData] = useState({});
  const getCourseData = async () => {
    try {
      const { data } = await axios.get(`/course/${courseId}`);
      console.log("Course Data ");
      console.log(data);
      setCourseData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourseData();
  }, []);

  if (Object.keys(courseData).length > 0) {
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
          {courseData.units.length > 0 ? (
            <div className="w-full h-full flex-col-centered p-4 ">
              <div className="text-2xl font-bold text-slate-500 my-2 font-sans">
                LIST OF UNITS
              </div>
              <div className="grid phone:grid-cols-1  tablet:grid-cols-2 laptop:grid-cols-3 gap-8 py-4 w-full h-full overflow-auto  ">
                {courseData.units.map((unit, index) => {
                  const { unitName, unitDescription, _id } = unit;
                  return (
                    <UnitsCard
                      unitId={_id}
                      key={index}
                      number={`${index + 1}`}
                      heading={unitName}
                      summary={unitDescription}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex-col-centered">
              This course is yet to be populated
              <ReturnBackBtn />
            </div>
          )}
        </div>

        {/* When this is absolute the parent collapses. */}
      </div>
    );
  } else {
    <div className="w-full h-screen flex-col-centered">
      This course is yet to be populated
      <ReturnBackBtn />
    </div>;
  }
};

export default UnitsOutline;
