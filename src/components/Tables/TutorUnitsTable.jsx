import React from "react";
import { CTAButton } from "../../components";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
const TutorUnitsTable = ({ unitsData }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const navigate = useNavigate();
  const location = useLocation();
  console.log({ unitsData });
  return (
    <div className="overflow-auto w-full laptop:px-3 ">
      <table className="w-full bg-slate-50 shadow-lg shadow-slate-200 rounded-lg overflow-hidden  ">
        <thead className="w-full bg-slate-600 text-white h-12  ">
          <tr className=" uppercase  tablet:h-10  w-full gap-2 ">
            <th className="w-12 ">No</th>
            <th className="w-24">Unit Name</th>
            <th className="w-12">Chapters</th>
            <th className="w-12">Lessons</th>
            <th className="w-24">CTA</th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {unitsData &&
            unitsData.map((unit, index) => {
              let numberOfChapters = unit?.unitChapters?.length;
              let numberOfLessons = 0;
              unit.unitChapters.forEach((chapter) => {
                numberOfLessons += chapter.chapterLessons.length;
              });
              return (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-cyan-100  " : ""
                  } cursor-pointer text-center h-8`}
                  key={`tutor-${index}`}
                >
                  <td>{`${index + 1}`}</td>
                  <td>{unit.unitName}</td>
                  <td>{numberOfChapters}</td>
                  <td>{numberOfLessons}</td>

                  <td className="flex-row-centered gap-3  ">
                    <button
                      className={`cta-btn group ${
                        roles?.includes("EM-201") && "hidden"
                      }`}
                      onClick={() => {
                        navigate("/new-unit", {
                          state: { unitID: unit?._id, background: location },
                        });
                      }}
                    >
                      <PencilIcon className="icon-styling h-4  text-white" />
                    </button>
                    <Link
                      to={`/unit/${unit?._id}`}
                      className="bg-slate-700 text-white rounded-full px-5 py-0.5"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TutorUnitsTable;
