import ReactQuill from "react-quill";
import React, { useState, useCallback, useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { useOutletContext } from "react-router-dom";
import { QuillEditorSkeleton } from "../../components";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchLessonNotes,
  handleError,
  createNotes,
  updateNotes,
} from "../../controllers";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const { openSideBar, sideBarOpen } = useOutletContext();
  const queryClient = useQueryClient();
  const { currentLesson } = useCurrentLessonContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const isAdmin = () => {
    if (roles?.includes("EM-203") || roles?.includes("EM-202")) {
      return true;
    }
    return false;
  };

  //Quill Editor Config
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isEditorEnabled, setIsEditorEnabled] = useState(false);
  const [areNotesPresent, setAreNotesPresent] = useState(false);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const notesQuery = useQuery(
    ["notes", currentLesson?.lessonNotes],
    () => fetchLessonNotes({ notesID: currentLesson?.lessonNotes }),
    {
      staleTime: 0,
      onSuccess: () => {
        console.log("Notes have been refetched successfully");
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["notes", currentLesson?.lessonNotes], {
            exact: true,
          });
        }
      },
    }
  );

  useEffect(() => {
    console.log(
      `Current lesson changed refetching notes for ${JSON.stringify(
        currentLesson?.lessonNotes
      )}`
    );
    notesQuery.refetch();
  }, [currentLesson?.lessonNotes]);

  useEffect(() => {
    if (notesQuery.status === "success" && notesQuery?.data) {
      setOriginalContent(notesQuery?.data);
      setContent(notesQuery?.data);
      setAreNotesPresent(true);
      return;
    }
    setAreNotesPresent(false);
    setOriginalContent("");
    setContent("");
    return;
  }, [notesQuery.status, currentLesson?.lessonNotes]);

  const createNotesMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", data._id], data);
      queryClient.invalidateQueries(["notes"]);
      updateAlertBoxData({
        response: "Lesson Notes have been saved",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });

      window.location.reload();
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createNotesMutation.mutate({
          lessonNotes: content,
          lessonID: currentLesson?._id,
        });
      }
    },
  });

  const updateNotesMutation = useMutation({
    mutationFn: updateNotes,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["notes", currentLesson?.lessonNotes], {
        exact: true,
      });
      updateAlertBoxData({
        response: "Lesson Notes updated succesfully!",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        updateNotesMutation.mutate({
          lessonNotes: content,
          notesID: currentLesson?.lessonNotes,
        });
      }
    },
  });

  const handleChange = useCallback((editorContent) => {
    setContent(editorContent);
  }, []);
  const enableEdit = () => {
    setIsEditorEnabled(true);
  };
  const disableEdit = () => {
    setIsEditorEnabled(false);
  };

  const handleSave = () => {
    disableEdit();
    if (areNotesPresent) {
      updateNotesMutation.mutate({
        lessonNotes: content,
        notesID: currentLesson?.lessonNotes,
      });
      return;
    }
    createNotesMutation.mutate({
      lessonNotes: content,
      lessonID: currentLesson?._id,
    });
    return;
  };

  const handleCancel = () => {
    setContent(originalContent); // Restore the original content
    setIsEditorEnabled(false);
  };

  return (
    <div className="w-full flex flex-col p-2 border-none ">
      <div
        className={`${
          roles?.includes("EM-202") || roles?.includes("EM-203")
            ? "flex"
            : "hidden"
        } w-full items-center justify-between gap-2 my-2`}
      >
        <h1 className="font-bold text-lg pt-2 ml-1 ">
          {currentLesson?.lessonName}
        </h1>
        <div className={`flex-row-centered gap-2  `}>
          <button
            className={`h-6 px-2 w-max  laptop:hidden bg-black text-white  text-sm  hover:bg-primary hover:text-white hover:cursor-pointer rounded-full ${
              sideBarOpen && "hidden"
            }`}
            onClick={openSideBar}
          >
            Sidebar
          </button>
          <div>
            {!isEditorEnabled ? (
              <button
                className="h-6 px-2 w-max  bg-black text-white text-sm hover:bg-primary hover:text-white hover:cursor-pointer rounded-full"
                onClick={() => {
                  enableEdit();
                }}
              >
                {!areNotesPresent ? "Add Notes" : "Edit Notes"}
              </button>
            ) : (
              <div className=" flex-row-centered gap-2">
                <button
                  className="h-6 px-2 w-max bg-black text-white hover:bg-primary hover:text-white hover:cursor-pointer rounded-full text-sm"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Save
                </button>
                <button
                  className="h-6 px-2 w-max bg-black text-white hover:bg-primary hover:text-white hover:cursor-pointer rounded-full text-sm"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="unit content" className="mt-1 ">
        {notesQuery.status === "loading" && <QuillEditorSkeleton />}

        {isEditorEnabled && isAdmin() ? (
          <div>
            <ReactQuill
              value={content}
              readOnly={!isEditorEnabled}
              onChange={handleChange}
              modules={quillModules}
            />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-start px-2 "
          />
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
