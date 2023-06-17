import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { AccordionItem, HomeBtn, Tooltip } from "../../components";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { useLocation, Link } from "react-router-dom";
const Accordion = ({ unitData, updateCurrentLesson, closeSideBar }) => {
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
    <div className="relative z-10 flex flex-col items-center h-full bg-slate-100 max-h-screen">
      <div className="flex items-center justify-between w-full px-2 py-2 font-bold text-md text-slate-200 bg-primary text-center">
        <HomeBtn />
        {unitData && unitData.unitName}
        <div className="flex gap-1">
          <div className={` gap-1 `}>
            <Tooltip text="Add Chapter">
              <Link
                to={`/tutor/new-chapter/${unitID}`}
                state={{ background: location }}
              >
                <IoMdAdd
                  className={`${
                    roles?.includes("EM-202") || roles?.includes("EM-202")
                      ? "flex"
                      : "hidden"
                  } text-white text-3xl rounded-lg hover:bg-slate-100 hover:text-black hover:cursor-pointer`}
                />
              </Link>
            </Tooltip>
          </div>
          <div
            className="tablet:hidden text-3xl"
            onClick={() => {
              closeSideBar();
            }}
          >
            <IoMdCloseCircle />
          </div>
        </div>
      </div>

      {unitData && unitData.unitChapters.length > 0 ? (
        <div className="w-full bg-secondary max-h-full overflow-auto">
          {unitData.unitChapters.map((chapter, chapterIndex) => (
            <AccordionItem
              unitData={unitData}
              updateCurrentLesson={updateCurrentLesson}
              key={`chapter-${chapterIndex}`}
              chapter={chapter}
              chapterIndex={chapterIndex}
              onToggle={() => handleToggle(chapterIndex)}
              closeSideBar={closeSideBar}
              active={clicked === chapterIndex}
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

export default Accordion;
