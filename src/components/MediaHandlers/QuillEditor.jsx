import ReactQuill from "react-quill";
import React, { useState, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchLessonNotes } from "../../controllers/fetchData";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createNotes, updateNotes } from "../../controllers/postData";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const { currentLesson } = useCurrentLessonContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  //Quill Editor Config
  const [readOnly, setReadOnly] = useState(true);
  const [content, setContent] = useState(null);
  const [originalContent, setOriginalContent] = useState(null);
  const [isEditorEnabled, setIsEditorEnabled] = useState(false);
  const [areNotesPresent, setAreNotesPresent] = useState(false);

  const notesQuery = useQuery({
    queryKey: ["notes", currentLesson?.lessonNotes],
    queryFn: () => fetchLessonNotes(currentLesson?.lessonNotes),
  });

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
    },
  });

  const updateNotesMutation = useMutation({
    mutationFn: updateNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", data._id], data);
      queryClient.invalidateQueries(["notes"], { exact: true });
      updateAlertBoxData({
        response: "Lesson Notes have been updated",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });

  let quillModules = {};

  if (roles?.includes("EM-202") || roles?.includes("EM-203")) {
    // Tutor-specific modules
    quillModules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    };
  } else {
    // Student-specific modules (hide toolbar)
    quillModules = {
      toolbar: false,
    };
  }

  const enableEdit = () => {
    setOriginalContent(content); // Store the original content
    setReadOnly(false);
    setIsEditorEnabled(true);
  };
  const disableEdit = () => {
    setReadOnly(true);
    setIsEditorEnabled(false);
  };

  const handleChange = useCallback((editorContent) => {
    setContent(editorContent);
  }, []);

  const handleSave = () => {
    if (areNotesPresent) {
      disableEdit();
      updateNotesMutation.mutate({
        lessonNotes: content,
        notesID: currentLesson?.lessonNotes,
      });
      return;
    }
    handleNotesCreation(content, currentLesson?._id);
    createNotesMutation.mutate({
      lessonNotes: content,
      lessonID: currentLesson?._id,
    });
    disableEdit();
    return;
  };

  const handleCancel = () => {
    setContent(originalContent); // Restore the original content
    setIsEditorEnabled(false);
  };

  useEffect(() => {
    console.log("Notes changing is refreshing well!");
    if (currentLesson !== null) {
      if (currentLesson?.lessonNotes) {
        setIsEditorEnabled(false);
        setAreNotesPresent(true);
        notesQuery.refetch();
      } else {
        setIsEditorEnabled(false);
        setAreNotesPresent(false);
        setOriginalContent(""); // Clear the original content when creating new notes
        setContent(""); // Clear the content when creating new notes
      }
    }
  }, [currentLesson]);
  return (
    <div className="w-full flex flex-col p-2 border-none ">
      <div id="unit content" className="mt-3">
        {roles?.includes("EM-202") || roles?.includes("EM-203") ? (
          <ReactQuill
            value={content}
            readOnly={!isEditorEnabled}
            onChange={handleChange}
            modules={quillModules}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className=" text-start"
          />
        )}
      </div>
      <div
        className={`${
          roles?.includes("EM-202") || roles?.includes("EM-203")
            ? "flex"
            : "hidden"
        } w-full items-center justify-end gap-2 my-2`}
      >
        {!isEditorEnabled ? (
          <button
            className="h-8 w-36 mx-auto bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
            onClick={() => {
              enableEdit();
            }}
          >
            {!areNotesPresent ? "Add Notes" : "Edit Notes"}
          </button>
        ) : (
          <div className="mx-auto flex-row-centered gap-2">
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
  );
};

export default QuillEditor;
