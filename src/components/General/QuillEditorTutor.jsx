import ReactQuill from "react-quill";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../axios";
import { Button } from "..";
import "react-quill/dist/quill.snow.css";

const QuillEditorTutor = () => {
  const { currentLesson } = useOutletContext();
  const [lessonID, setLessonID] = useState(null);
  // console.log(`Current Lesson Data : ${JSON.stringify(currentLesson)}`);

  //Quill Editor Config
  const [readOnly, setReadOnly] = useState(true);
  const [content, setContent] = useState(null);
  const [originalContent, setOriginalContent] = useState(null);
  const [isEditorEnabled, setIsEditorEnabled] = useState(false);
  const [areNotesPresent, setAreNotesPresent] = useState(false);

  // Alert Box Config
  const [response, setResponse] = useState(null);
  const [responseTracker, setResponseTracker] = useState(null);
  const [statusTracker, setStatusTracker] = useState(null);
  const [submit, setSubmit] = useState(false);

  const fetchLessonNotes = async (notesID) => {
    try {
      const { data: notesData } = await axios.get(`notes/${notesID}`);
      setContent(notesData.content);
    } catch (err) {
      console.log(err);
    }
  };

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
      handleUpdate(content, currentLesson?.lessonNotes);
      return;
    }
    handleCreation(content, lessonID);
    disableEdit();
    return;
  };

  const handleCancel = () => {
    setContent(originalContent); // Restore the original content
    setIsEditorEnabled(false);
  };
  const handleCreation = async (content, lessonID) => {
    const formData = new FormData();
    formData.append("lessonNotes", content);
    formData.append("lessonID", lessonID);

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.post("/notes/newNotes", formData, config);
      const { status } = response;

      if (status === 201) {
        setResponse("Data saved successfully to DB.");
        setStatusTracker(true);
        setResponseTracker(true);
        disableEdit();
        setTimeout(() => {
          setResponseTracker(false);
        }, 1200);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        setResponse("Something went wrong. Please try again.");
        setSubmit(true);
        setStatusTracker(false);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
        }, 2500);
      } else {
        console.log(err);
      }
    }
  };

  const handleUpdate = async (content, notesID) => {
    const formData = new FormData();
    formData.append("lessonNotes", content);
    formData.append("notesID", notesID);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.put("/notes/updateNotes", formData, config);
      const { status } = response;

      if (status === 202) {
        setResponse("Lesson Notes have been successfully updated");
        setStatusTracker(true);
        setResponseTracker(true);
        disableEdit();
        setTimeout(() => {
          setResponseTracker(false);
        }, 1200);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        setResponse("Something went wrong. Please try again.");
        setSubmit(true);
        setStatusTracker(false);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
        }, 2500);
      } else {
        console.log(err);
      }
    }
  };

  const quillConfig = useMemo(
    () => ({
      className: "px-2 pb-2 h-full",
      theme: "snow",
    }),
    []
  );

  useEffect(() => {
    if (currentLesson !== null) {
      setLessonID(currentLesson?.lessonID);
      if (currentLesson?.lessonNotes) {
        setIsEditorEnabled(false);
        setAreNotesPresent(true);
        fetchLessonNotes(currentLesson?.lessonNotes);
      } else {
        setIsEditorEnabled(true);
        setAreNotesPresent(false);
        setOriginalContent(""); // Clear the original content when creating new notes
        setContent(""); // Clear the content when creating new notes
      }
    }
  }, [currentLesson]);
  return (
    <div className="w-full flex flex-col gap-4">
      <div id="unit content" className="rounded-md">
        <ReactQuill
          value={content}
          readOnly={!isEditorEnabled}
          onChange={handleChange}
          {...quillConfig}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {!isEditorEnabled ? (
          <button
            className="h-8 w-24 bg-black text-white hover:bg-purple-500 hover:text-white hover:cursor-pointer rounded-full"
            onClick={() => {
              enableEdit();
            }}
          >
            {!areNotesPresent ? "Add Notes" : "Edit Notes"}
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default QuillEditorTutor;
