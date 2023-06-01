import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { AccordionItem } from "../../components";
import { IoMdAdd } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { useLocation, Link, useOutletContext } from "react-router-dom";
const AccordionSmall = () => {
  const { unitData, fetchUnitData, updateCurrentLesson } = useOutletContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  // console.log(JSON.stringify(roles));
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
    <div className="flex flex-col items-center">
      <div className="w-full h-full bg-slate-200 m-1 rounded-lg list-none ">
        <div className="flex items-center justify-between w-full px-2 py-2 font-bold text-lg text-slate-200 bg-primary text-center gap-4 rounded-t-lg">
          <Link to="/">
            <span className="text-white text-2xl flex items-center justify-center">
              <AiFillHome />
            </span>
          </Link>

          <h1>{unitData && unitData.unitName}</h1>
          <div className="flex items-center justify-between w-16">
            <Link
              to={`/tutor/new-chapter/${unitID}`}
              state={{ background: location }}
            >
              <span
                className="text-white text-3xl rounded-lg hover:bg-slate-100 hover:text-black hover:cursor-pointer"
                onClick={() => {
                  fetchUnitData();
                }}
              >
                <IoMdAdd />
              </span>
            </Link>

            <span
              className="text-white text-3xl rounded-lg hover:bg-slate-100 hover:text-black hover:cursor-pointer"
              onClick={() => {
                fetchUnitData();
              }}
            >
              <BiRefresh />
            </span>
          </div>
        </div>

        {unitData && unitData.unitChapters ? (
          unitData.unitChapters.map((chapter, index) => (
            <AccordionItem
              updateCurrentLesson={updateCurrentLesson}
              key={`chapter-${index}`}
              chapter={chapter}
              onToggle={() => handleToggle(index)}
              active={clicked === index}
            />
          ))
        ) : (
          <div className="flex-col-centered">This unit has no content yet</div>
        )}
      </div>
    </div>
  );
};

export default AccordionSmall;
