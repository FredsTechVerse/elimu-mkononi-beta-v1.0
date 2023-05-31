import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import TutorAccordionItem from "./TutorAccordionItem";
import { IoMdAdd } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { useLocation, Link } from "react-router-dom";
const TutorAccordion = ({ unitData, fetchUnitData, updateCurrentLesson }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const location = useLocation();
  // USING THE CHAPTER ID WE CAN SHOW THE LESSONS.
  const unitID = unitData && unitData._id;
  const [clicked, setClicked] = useState("0");
  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex items-center justify-between w-full px-2 py-2 font-bold text-md text-slate-200 bg-primary text-center gap-4 rounded-t-lg">
        <Link to="/">
          <AiFillHome className="text-white text-xl flex items-center justify-center" />
        </Link>

        <h1 className="pt-0.5">{unitData && unitData.unitName}</h1>
        <div
          className={` ${
            roles.includes("EM-202") || roles.includes("EM-202")
              ? "flex"
              : "hidden"
          } items-center justify-between `}
        >
          <Link
            to={`/tutor/new-chapter/${unitID}`}
            state={{ background: location }}
          >
            <IoMdAdd className="text-white text-2xl rounded-lg hover:bg-slate-100 hover:text-black hover:cursor-pointer" />
          </Link>

          <BiRefresh
            className="text-white text-2xl rounded-lg hover:bg-slate-100 hover:text-black hover:cursor-pointer"
            onClick={() => {
              fetchUnitData();
            }}
          />
        </div>
      </div>

      {unitData && unitData.unitChapters.length > 0 ? (
        <div className="w-full bg-secondary">
          {unitData.unitChapters.map((chapter, index) => (
            <TutorAccordionItem
              updateCurrentLesson={updateCurrentLesson}
              key={`chapter-${index}`}
              chapter={chapter}
              onToggle={() => handleToggle(index)}
              active={clicked === index}
            />
          ))}
        </div>
      ) : (
        <div className="flex-col-centered text-center py-3 px-2 bg-rose-300 m-2 rounded-lg">
          This unit has no content yet.Kindly add conentent by clicking the plus
          button above.
        </div>
      )}
    </div>
  );
};

export default TutorAccordion;