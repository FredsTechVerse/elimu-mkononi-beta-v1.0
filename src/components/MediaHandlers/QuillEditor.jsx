import ReactQuill from "react-quill";
import React, { useState, useCallback, useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { useOutletContext } from "react-router-dom";
import { QuillEditorSkeleton, MenuBtn } from "../../components";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchLessonNotes } from "../../controllers/fetchData";
import { createNotes, updateNotes } from "../../controllers/postData";
import { handleError } from "../../controllers/handleErrors";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const { openSideBar } = useOutletContext();
  const queryClient = useQueryClient();
  const { currentLesson } = useCurrentLessonContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const isAdmin = () => {
    if (roles.includes("EM-201") || roles.includes("EM-202")) {
      return true;
    }
    return false;
  };

  //Quill Editor Config
  const [content, setContent] = useState("");
  // const [newContent, setNewContent] = useState("");
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
    () => fetchLessonNotes(currentLesson?.lessonNotes),
    {
      retry: 0,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["notes"]);
        }
      },
      onSuccess: (savedNotes) => {
        if (savedNotes) {
          setOriginalContent(savedNotes);
          setContent(savedNotes);
          setAreNotesPresent(true);
          return;
        }
        setAreNotesPresent(false);
        setOriginalContent("");
        setContent("");
        return;
      },
    }
  );
  useEffect(() => {
    notesQuery.refetch();
  }, [currentLesson?.lessonNotes]);

  const createNotesMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", data._id], data);
      queryClient.invalidateQueries(["notes"], { exact: true });
      updateAlertBoxData({
        response: "Lesson Notes have been saved",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
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
      queryClient.setQueryData(["notes", data._id], data);
      queryClient.invalidateQueries(["notes"], { exact: true });
      console.log(`Updated notes ${JSON.stringify(data)}`);
      updateAlertBoxData({
        response: "Lesson Notes updated succesfully!",
        isResponse: true,
        status: "success",
        timeout: 2500,
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
    console.log(editorContent);
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
      {/* CTA BUTTONS */}
      {/* <button
        className={`${roles.includes(
          "EM-201" ? "flex " : "hidden"
        )} h-8 w-36  laptop:hidden bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full`}
        onClick={openSideBar}
      >
        Open Sidebar
      </button> */}
      <div
        className={`${
          roles?.includes("EM-202") || roles?.includes("EM-203")
            ? "flex"
            : "hidden"
        } w-full items-center justify-end gap-2 my-2`}
      >
        <button
          className="h-8 w-36 laptop:hidden bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
          onClick={openSideBar}
        >
          Open Sidebar
        </button>
        <div>
          {!isEditorEnabled ? (
            <button
              className="h-8 w-36 bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
              onClick={() => {
                enableEdit();
              }}
            >
              {!areNotesPresent ? "Add Notes" : "Edit Notes"}
            </button>
          ) : (
            <div className=" flex-row-centered gap-2">
              <button
                className="h-8 w-24 bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
              <button
                className="h-8 w-24 bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
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
      <div id="unit content" className="mt-3 ">
        {currentLesson.lessonNotes && notesQuery.status === "loading" && (
          <QuillEditorSkeleton />
        )}

        {notesQuery.status === "success" && isEditorEnabled && isAdmin ? (
          <ReactQuill
            value={content}
            readOnly={!isEditorEnabled}
            onChange={handleChange}
            modules={quillModules}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-start px-2"
          />
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
