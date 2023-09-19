import React, { useEffect, useRef, useState } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  const { courseID } = useParams();
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
    <li className="accordion_item ">
      <div className="button border-b-2 border-b-lg hover:bg-slate-300   p-0 h-14 flex items-center justify-between gap-0.5 w-full ">
        <p
          className="w-[60%] h-full flex-row-centered font-bold text-[13px] text-start pl-2  "
          onClick={onToggle}
        >
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {chapter?.chapterName}
          </span>
        </p>
        <div
          className={` flex items-center ${
            roles?.includes("EM-201")
              ? "justify-end pr-2"
              : "justify-between  gap-1  "
          } w-[40%]  px-1 `}
        >
          <div className="flex-row-centered gap-1.5">
            <button
              className={`${roles?.includes("EM-203") ? " group" : "hidden"}`}
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
              <PlusIcon className="icon-styling h-5  text-slate-700" />
            </button>
            <button
              className={`${roles?.includes("EM-203") ? " group" : "hidden"}`}
              onClick={() => {
                navigate("/new-chapter", {
                  state: {
                    chapterID: chapter?._id,
                    background: location,
                  },
                });
              }}
            >
              <PencilIcon className="icon-styling h-3 laptop:h-4 text-slate-700" />
            </button>
            <button
              className={`${
                roles?.includes("EM-203") ? " group" : "hidden"
              } group`}
              onClick={() => {
                setIsDeleteChapterQueryEnabled(true);
              }}
            >
              <TrashIcon className="icon-styling h-3 laptop:h-4 text-slate-700" />
            </button>
          </div>

          <span onClick={onToggle}>
            {active ? (
              <ChevronDownIcon className="icon-styling h-5 text-slate-900 group-hover:text-white" />
            ) : (
              <ChevronRightIcon className="icon-styling h-5 text-slate-900 group-hover:text-white" />
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
                className=" bg-slate-300 hover:bg-slate-400 text-black w-full  mb-0.5 capitalize rounded-md px-1.5 h-9"
              >
                <div className="flex flex-row items-center  justify-between ">
                  {lesson.videoKind === "youtube#video" ? (
                    <PlayCircleIcon
                      className=" icon-styling text-slate-700 hover:text-slate-900"
                      onClick={() => {
                        updateCurrentLesson({
                          ...unitData?.unitChapters[chapterIndex]
                            ?.chapterLessons[lessonIndex],
                          lessonIndex: lessonIndex,
                          chapterIndex: chapterIndex,
                        });
                        closeSideBar();
                        navigate(`/unit/${unitID}`);
                      }}
                    />
                  ) : (
                    <WalletIcon
                      className="icon-styling h-4 text-slate-700 hover:text-slate-900"
                      onClick={() => {
                        updateCurrentLesson({
                          ...unitData?.unitChapters[chapterIndex]
                            ?.chapterLessons[lessonIndex],
                          lessonIndex: lessonIndex,
                          chapterIndex: chapterIndex,
                        });
                        closeSideBar();
                        navigate(`/unit/${unitID}`);
                      }}
                    />
                  )}
                  <p
                    className=" h-full text-center whitespace-nowrap py-3 text-xs  overflow-hidden text-ellipsis  w-[65%] capitalize "
                    onClick={() => {
                      console.log("Updating current lesson");
                      updateCurrentLesson({
                        ...unitData?.unitChapters[chapterIndex]?.chapterLessons[
                          lessonIndex
                        ],
                        lessonIndex: lessonIndex,
                        chapterIndex: chapterIndex,
                      });
                      closeSideBar();
                      navigate(`/course/${courseID}/${unitID}/content`);
                    }}
                  >
                    {lesson.lessonName}
                  </p>
                  <div className="flex gap-1">
                    <button
                      className={` group ${
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
                      <PencilIcon className="icon-styling h-3 laptop:h-4 text-slate-700 " />
                    </button>
                    <button
                      className={`group ${
                        roles?.includes("EM-201") && "hidden"
                      }`}
                      onClick={() => {
                        setLessonToDelete(lesson?._id);
                        setIsDeleteLessonQueryEnabled(true);
                      }}
                    >
                      <TrashIcon className="icon-styling h-3 laptop:h-4 text-slate-700" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}

        <button
          className="hover:bg-slate-400 bg-slate-500 text-white hover:text-slate-900 text-center w-full px-3 py-2 my-0.5 capitalize rounded-md flex justify-between items-center "
          onClick={() => {
            navigate(
              `/course/${courseID}/${unitID}/resources/${chapter?._id}`,
              {
                state: {
                  background: location,
                },
              }
            );
          }}
        >
          Resources
        </button>
      </ul>
    </li>
  );
};

export default AccordionItem;
