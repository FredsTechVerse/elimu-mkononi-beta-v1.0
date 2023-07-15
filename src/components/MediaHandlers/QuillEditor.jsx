import ReactQuill from "react-quill";
import React, { useState, useCallback, useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { QuillEditorSkeleton } from "../../components";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchLessonNotes } from "../../controllers/fetchData";
import { createNotes, updateNotes } from "../../controllers/postData";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const { currentLesson } = useCurrentLessonContext();
  const roles = JSON.parse(localStorage.getItem("roles"));

  //Quill Editor Config
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
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
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        queryClient.invalidateQueries(["notes", currentLesson?.lessonNotes]);
      },
      onSuccess: (data) => {
        if (data) {
          setOriginalContent(data);
          setNewContent(data);
          setAreNotesPresent(false);
        }
        setContent("No notes are present");
        setAreNotesPresent(false);
      },
    }
  );

  const createNotesMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", data._id], data);
      queryClient.invalckidateQueries(["notes"], { exact: true });
      updateAlertBoxData({
        response: "Lesson Notes have been saved",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      createNotesMutation.mutate({
        lessonNotes: content,
        lessonID: currentLesson?._id,
      });
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
      updateNotesMutation.mutate({
        lessonNotes: content,
        notesID: currentLesson?.lessonNotes,
      });
    },
  });

  const handleChange = useCallback((editorContent) => {
    setNewContent(editorContent);
    setContent(newContent);
  }, []);
  const enableEdit = () => {
    setIsEditorEnabled(true);
  };
  const disableEdit = () => {
    setIsEditorEnabled(false);
  };

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
    if (currentLesson !== null) {
      if (currentLesson?.lessonNotes) {
        setIsEditorEnabled(false);
      } else {
        console.log(`There are no notes since i cannot find a notes ID`);
        setIsEditorEnabled(false);
      }
    }
  }, [currentLesson]);
  return (
    <div className="w-full flex flex-col p-2 border-none ">
      <div id="unit content" className="mt-3">
        {notesQuery.status === "loading" ? (
          <QuillEditorSkeleton />
        ) : notesQuery.status === "error" ? (
          <p className="bg-red-300 rounded-lg p-4">
            {JSON.stringify(notesQuery.error.message)}
          </p>
        ) : (notesQuery.status === "success" && roles?.includes("EM-202")) ||
          roles?.includes("EM-203") ? (
          <ReactQuill
            value={content}
            readOnly={!isEditorEnabled}
            onChange={handleChange}
            modules={quillModules}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-start"
          />
        )}
      </div>

      {/* CTA BUTTONS */}
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
