import React from "react";
import { CTAButton } from "../../components";
const TutorUnitsTable = ({ unitsData }) => {
  return (
    <div className="hidden laptop:block w-full px-3">
      <table className="table-fixed w-full bg-slate-300 bg-opacity-10 shadow-lg shadow-slate-200">
        <thead>
          <tr className="text-white uppercase bg-primary h-10 ">
            <th className=" w-12 ">No</th>
            <th className=" w-full">Unit Name</th>
            <th className=" w-full">Chapters</th>
            <th className=" w-full">Lessons</th>
            <th className=" w-full">CTA</th>
          </tr>
        </thead>
        <tbody>
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
                    <CTAButton
                      _id={unit?._id}
                      contact={unit?.email}
                      fetchUsersData={unitsData}
                    />
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
