import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "../../components";
import {
  BsChevronRight,
  BsChevronDown,
  BsMusicNoteBeamed,
  BsFileEarmarkPdf,
  BsCameraVideoFill,
} from "react-icons/bs";
import { RiSlideshowFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

// It should be having the chapter name & the lessons.
const AccordionItem = ({
  chapter,
  onToggle,
  active,
  updateCurrentLesson,
  chapterIndex,
  closeSideBar,
  unitData,
}) => {
  const location = useLocation();
  // console.log(`Chapter Data ${JSON.stringify(chapter)}`);
  const { _id: chapterID, chapterName, chapterLessons } = chapter;
  const roles = JSON.parse(localStorage.getItem("roles"));
  const contentEl = useRef(); //Used to interact with the dom accordigly

  return (
    <li className="accordion_item">
      <button className="button  px-2 text-sm " onClick={onToggle}>
        {chapterName}
        <div className="flex gap-3 items-center justify-between">
          {roles?.includes("EM-202") && (
            <Link
              to={`/tutor/new-lesson/${chapterID}`}
              state={{ background: location }}
            >
              <Tooltip tooltip="Add lesson">
                <div
                  onClick={closeSideBar}
                  className="text-2xl hover:bg-slate-100 hover:text-black rounded-full"
                >
                  <IoMdAdd />
                </div>
              </Tooltip>
            </Link>
          )}

          <span className="text-xl">
            {active ? <BsChevronDown /> : <BsChevronRight />}
          </span>
        </div>
      </button>
      <ul
        ref={contentEl}
        className=" h-0 overflow-hidden transition-all ease-in-out duration-500 flex flex-col  px-2 "
        style={
          active
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        {chapterLessons.map((lesson, lessonIndex) => {
          const {
            _id: lessonID,
            lessonUrl,
            lessonName,
            lessonNotes,
            lessonResources,
          } = lesson;

          return (
            <li
              key={lessonIndex}
              className="hover:bg-slate-500 bg-slate-300 text-black w-full px-3 py-2 my-0.5 capitalize rounded-md"
              onClick={() => {
                updateCurrentLesson({
                  ...unitData?.unitChapters[chapterIndex]?.chapterLessons[
                    lessonIndex
                  ],
                  lessonIndex: lessonIndex,
                  chapterIndex: chapterIndex,
                });
                closeSideBar();
              }}
            >
              <div className="flex flex-row items-center gap-5 justify-start">
                {lesson.lessonType === "video" ? (
                  <span className="text-sm">
                    <BsCameraVideoFill />
                  </span>
                ) : lesson.lessonType === "audio" ? (
                  <span className="text-sm">
                    <BsMusicNoteBeamed />
                  </span>
                ) : lesson.lessonType === "pdf " ? (
                  <span className="text-sm">
                    <BsFileEarmarkPdf />
                  </span>
                ) : (
                  <span className="text-sm">
                    <RiSlideshowFill />
                  </span>
                )}

                {lesson.lessonName}
              </div>
              {/* </Link> */}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default AccordionItem;
