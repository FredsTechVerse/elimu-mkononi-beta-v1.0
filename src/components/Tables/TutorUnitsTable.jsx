import React from "react";
import { CTAButton } from "../../components";
import { Link } from "react-router-dom";
const TutorUnitsTable = ({ unitsData }) => {
  return (
    <div className="overflow-auto w-full laptop:px-3 ">
      <table className="table-fixed bg-slate-300 bg-opacity-10 shadow-lg shadow-slate-200 w-full">
        <thead className="w-full ">
          <tr className="text-white uppercase bg-primary h-10  w-full gap-2 ">
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

                  <td>
                    <Link to={`/unit/${unit?._id}`}>
                      <button className="bg-primary text-white rounded-full px-5 py-0.5">
                        View
                      </button>
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
