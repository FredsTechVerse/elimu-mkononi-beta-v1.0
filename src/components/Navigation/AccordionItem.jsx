import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "../../components";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  PlayCircleIcon,
  CodeBracketIcon,
  CogIcon,
  WalletIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

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

  const identifyLessonType = (lessonUrl) => {
    if (lessonUrl) {
      const lessonType = lessonUrl.split(".")[1];
      return lessonType;
    }
    return "undefined";
  };

  return (
    <li className="accordion_item">
      <button
        className="button px-2 text-sm flex items-center "
        onClick={onToggle}
      >
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
                  className="w-8 h-8 hover:border-white hover:border-2 rounded-full"
                >
                  <PlusIcon className="icon-styling" />
                </div>
              </Tooltip>
            </Link>
          )}

          <span className="text-xl">
            {active ? (
              <ChevronDownIcon className="icon-styling" />
            ) : (
              <ChevronRightIcon className="icon-styling" />
            )}
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
          // console.log(lesson);
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
                {identifyLessonType(lesson.lessonUrl) === "mp4" ? (
                  <span className="text-sm">
                    <PlayCircleIcon className="icon-styling text-slate-800" />
                  </span>
                ) : identifyLessonType(lesson.lessonUrl) === "mp3" ? (
                  <span className="text-sm">
                    <MusicalNoteIcon className="icon-styling text-slate-800" />
                  </span>
                ) : identifyLessonType(lesson.lessonUrl) === "pdf " ? (
                  <span className="text-sm">
                    <DocumentTextIcon className="icon-styling  text-slate-800" />
                  </span>
                ) : (
                  <span className="text-sm">
                    <WalletIcon className="icon-styling text-slate-800" />
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
