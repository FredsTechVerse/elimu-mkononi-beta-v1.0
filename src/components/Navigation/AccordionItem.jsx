import React, { useEffect, useRef, useState } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteChapter, deleteLesson, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentLessonContext } from "../../context/currentLessonContext";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlayCircleIcon,
  WalletIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const AccordionItem = ({
  chapter,
  onToggle,
  active,
  chapterIndex,
  closeSideBar,
  unitData,
  unitID,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lessonTotals = chapter && chapter?.chapterLessons?.length;
  const { updateAlertBoxData } = useAlertBoxContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeleteChapterQueryEnabled, setIsDeleteChapterQueryEnabled] =
    useState(false);
  const [isDeleteLessonQueryEnabled, setIsDeleteLessonQueryEnabled] =
    useState(false);
  const contentEl = useRef();
  const { updateCurrentLesson } = useCurrentLessonContext();

  useQuery(
    ["deletedChapter"],
    () => deleteChapter({ chapterID: chapter?._id, role: roles }),
    {
      enabled: isDeleteChapterQueryEnabled,
      staleTime: 0,
      retry: 0,
      onSuccess: () => {
        updateAlertBoxData({
          response: "Deleted chapter successfully",
          isResponse: true,
          status: "success",
          timeout: 2500,
        });
        setIsDeleteChapterQueryEnabled(false);
        queryClient.invalidateQueries(["unitData"]);
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["deletedChapter"]);
        }
      },
    }
  );

  useQuery(
    ["deletedLesson"],
    () => deleteLesson({ lessonID: lessonToDelete }),
    {
      enabled: isDeleteLessonQueryEnabled,
      staleTime: 0,
      retry: 0,
      onSuccess: () => {
        updateAlertBoxData({
          response: "Deleted lesson successfully",
          isResponse: true,
          status: "success",
          timeout: 2500,
        });
        setIsDeleteLessonQueryEnabled(false);
        queryClient.invalidateQueries(["unitData"]);
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["deletedLesson"]);
        }
      },
    }
  );
  return (
    <li className="accordion_item">
      <div
        className="button hover:bg-slate-300 group px-2 text-sm flex items-center "
        onClick={onToggle}
      >
        {chapter?.chapterName}
        <div className="flex gap-3 items-center justify-between">
          <div className="flex-row-centered gap-2">
            <button
              className={`${
                roles?.includes("EM-203") ? "cta-btn group" : "hidden"
              }`}
              onClick={() => {
                navigate("/new-lesson", {
                  state: {
                    background: location,
                    chapterID: chapter?._id,
                    lessonTotals: lessonTotals,
                  },
                });
              }}
            >
              <PlusIcon className="icon-styling h-3 laptop:h-4  text-white" />
            </button>
            <button
              className={`${
                roles?.includes("EM-203") ? "cta-btn group" : "hidden"
              }`}
              onClick={() => {
                navigate("/new-chapter", {
                  state: {
                    chapterID: chapter?._id,
                    background: location,
                  },
                });
              }}
            >
              <PencilIcon className="icon-styling h-3 laptop:h-4 text-white" />
            </button>
            <button
              className={`${
                roles?.includes("EM-203") ? "cta-btn group" : "hidden"
              } cta-btn group`}
              onClick={() => {
                setIsDeleteChapterQueryEnabled(true);
              }}
            >
              <TrashIcon className="icon-styling h-3 laptop:h-4 text-white" />
            </button>
          </div>

          <span>
            {active ? (
              <ChevronDownIcon className="icon-styling text-slate-900 group-hover:text-white" />
            ) : (
              <ChevronRightIcon className="icon-styling text-slate-900 group-hover:text-white" />
            )}
          </span>
        </div>
      </div>
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
                className=" bg-slate-300 hover:bg-slate-400 text-black w-full px-3  my-0.5 capitalize rounded-md"
                onClick={() => navigate(`/unit/${unitID}`)}
              >
                <div className="flex flex-row items-center  justify-between">
                  {lesson.videoKind === "youtube#video" ? (
                    <PlayCircleIcon
                      className=" icon-styling text-slate-700 hover:bg-slate-700"
                      onClick={() => {
                        updateCurrentLesson({
                          ...unitData?.unitChapters[chapterIndex]
                            ?.chapterLessons[lessonIndex],
                          lessonIndex: lessonIndex,
                          chapterIndex: chapterIndex,
                        });
                        closeSideBar();
                      }}
                    />
                  ) : (
                    <WalletIcon
                      className="icon-styling h-4 text-slate-700 hover:bg-slate-900"
                      onClick={() => {
                        updateCurrentLesson({
                          ...unitData?.unitChapters[chapterIndex]
                            ?.chapterLessons[lessonIndex],
                          lessonIndex: lessonIndex,
                          chapterIndex: chapterIndex,
                        });
                        closeSideBar();
                      }}
                    />
                  )}
                  <p
                    className=" h-full text-center whitespace-wrap px-2 py-3   w-full capitalize text-sm"
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
                    {lesson.lessonName}
                  </p>
                  <div className="flex gap-1">
                    <button
                      className={`cta-btn group ${
                        roles?.includes("EM-201") && "hidden"
                      }`}
                      onClick={() => {
                        navigate("/new-lesson", {
                          state: {
                            lessonID: lesson?._id,
                            background: location,
                          },
                        });
                      }}
                    >
                      <PencilIcon className="icon-styling h-3 laptop:h-4 text-white" />
                    </button>
                    <button
                      className={`cta-btn group ${
                        roles?.includes("EM-201") && "hidden"
                      }`}
                      onClick={() => {
                        setLessonToDelete(lesson?._id);
                        setIsDeleteLessonQueryEnabled(true);
                      }}
                    >
                      <TrashIcon className="icon-styling h-3 laptop:h-4 text-white" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}

        <li
          className="hover:bg-slate-400 bg-slate-500 text-white hover:text-slate-900 text-center w-full px-3 py-2 my-0.5 capitalize rounded-md flex justify-between items-center debug"
          onClick={() => {
            navigate(`resources/${chapter?._id}`, {
              state: {
                background: location,
              },
            });
          }}
        >
          <p>Resources</p>
        </li>
      </ul>
    </li>
  );
};

export default AccordionItem;
