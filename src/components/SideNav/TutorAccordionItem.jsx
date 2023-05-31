import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
const TutorAccordionItem = ({
  chapter,
  onToggle,
  active,
  updateCurrentLesson,
}) => {
  const location = useLocation();
  // console.log(`Chapter Data ${JSON.stringify(chapter)}`);
  const { _id: chapterID, chapterName, chapterLessons } = chapter;
  const roles = JSON.parse(localStorage.getItem("roles"));
  const contentEl = useRef(); //Used to interact with the dom accordigly.
  return (
    <li className="accordion_item">
      <button
        className="button  px-2 border-t-1 border-slate-300"
        onClick={onToggle}
      >
        {chapterName}
        <div className="flex gap-3 items-center justify-between">
          {roles.includes("EM-202") && (
            <Link
              to={`/tutor/new-lesson/${chapterID}`}
              state={{ background: location }}
            >
              <span className="text-2xl">
                <IoMdAdd />
              </span>
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
        {chapterLessons.map((lesson, index) => {
          const {
            _id: lessonID,
            lessonUrl,
            lessonName,
            lessonNotes,
            lessonResources,
          } = lesson;

          return (
            <li
              key={index}
              className="hover:bg-slate-500 bg-slate-300 text-black w-full px-3 py-2 my-0.5 capitalize rounded-md"
              onClick={() => {
                updateCurrentLesson({
                  lessonID,
                  lessonUrl,
                  lessonName,
                  lessonNotes,
                  lessonResources,
                });
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

export default TutorAccordionItem;
