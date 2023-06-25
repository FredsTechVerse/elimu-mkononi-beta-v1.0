import { useState } from "react";
import { AccordionItem, BackBtn, Tooltip } from "../../components";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
    <div className="relative z-10 flex flex-col items-center  bg-slate-100 h-screen ">
      <div className="flex items-center justify-between w-full px-2 h-12  font-bold text-md text-slate-200 bg-primary text-center">
        <BackBtn />
        {unitData && unitData.unitName}
        <div className={` flex-row-centered gap-1 `}>
          <Tooltip text="Add Chapter">
            <div
              className={`${
                roles?.includes("EM-202") || roles?.includes("EM-202")
                  ? "flex"
                  : "hidden"
              } hover:border-2 hover:border-white rounded-full `}
            >
              <Link
                to={`/tutor/new-chapter/${unitID}`}
                state={{ background: location }}
              >
                <PlusIcon className="text-white m-0.5 hover:cursor-pointer w-6 h-6" />
              </Link>
            </div>
          </Tooltip>
          <div
            className="text-white m-1 hover:cursor-pointer w-7 h-7 tablet:hidden"
            onClick={() => {
              closeSideBar();
            }}
          >
            <XCircleIcon className="icon-styling text-black" />
          </div>
        </div>
      </div>

      {unitData && unitData.unitChapters.length > 0 ? (
        <div className="w-full bg-secondary h-full overflow-auto debug  ">
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
