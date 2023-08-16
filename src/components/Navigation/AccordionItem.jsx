import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlayCircleIcon,
  WalletIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useCurrentLessonContext } from "../../context/currentLessonContext";

// It should be having the chapter name & the lessons.
const AccordionItem = ({
  chapter,
  onToggle,
  active,
  chapterIndex,
  closeSideBar,
  unitData,
}) => {
  const location = useLocation();
  const lessonTotals = chapter && chapter?.chapterLessons?.length;
  const roles = JSON.parse(localStorage.getItem("roles"));
  const contentEl = useRef();
  const { updateCurrentLesson } = useCurrentLessonContext();
  return (
    <li className="accordion_item">
      <button
        className="button group px-2 text-sm flex items-center "
        onClick={onToggle}
      >
        {chapter?.chapterName}
        <div className="flex gap-3 items-center justify-between">
          {roles?.includes("EM-202") ||
            (roles?.includes("EM-203") && (
              <div className="flex-row-centered gap-2">
                <Link
                  to={`/new-lesson`}
                  state={{
                    background: location,
                    chapterID: chapter?._id,
                    lessonTotals: lessonTotals,
                  }}
                >
                  <div onClick={closeSideBar}>
                    <PlusCircleIcon className="icon-styling group-hover:text-white text-slate-400  " />
                  </div>
                </Link>
              </div>
            ))}

          <span>
            {active ? (
              <ChevronDownIcon className="icon-styling text-slate-900 group-hover:text-white" />
            ) : (
              <ChevronRightIcon className="icon-styling text-slate-900 group-hover:text-white" />
            )}
          </span>
        </div>
      </button>
      <ul
        ref={contentEl}
        className=" h-0 overflow-hidden transition-all ease-in-out duration-500 flex flex-col  px-2 "
        style={
          active
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        {chapter?.chapterLessons &&
          chapter?.chapterLessons.map((lesson, lessonIndex) => {
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
                  {lesson.videoKind === "youtube#video" ? (
                    <span className="text-sm">
                      <PlayCircleIcon className="icon-styling text-slate-800" />
                    </span>
                  ) : (
                    <span className="text-sm">
                      <WalletIcon className="icon-styling text-slate-800" />
                    </span>
                  )}

                  {lesson.lessonName}
                </div>
              </li>
            );
          })}
        <Link
          to={`/new-resource`}
          state={{
            background: location,
            chapterID: chapter?._id,
          }}
        >
          <li className="hover:bg-slate-400 bg-slate-500 text-white hover:text-slate-900 text-center w-full px-3 py-2 my-0.5 capitalize rounded-md">
            Add Resource
          </li>
        </Link>
      </ul>
    </li>
  );
};

export default AccordionItem;
