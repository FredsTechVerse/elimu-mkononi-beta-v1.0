import ReactQuill from "react-quill";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../axios";
import { Button } from "..";
import "react-quill/dist/quill.snow.css";

const QuillEditorTutor = () => {
  const { currentLesson } = useOutletContext();
  const [notesID, setNotesID] = useState(null);
  const [lessonID, setLessonID] = useState(null);
  // console.log(`Current Lesson Data : ${JSON.stringify(currentLesson)}`);

  //Quill Editor Config
  const [readOnly, setReadOnly] = useState(true);
  const [content, setContent] = useState(null);
  const [newContent, setNewContent] = useState(null);
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
      console.log(notesData.content);
      setContent(notesData.content);
      setNewContent(notesData.content);
      console.log(areNotesPresent);
    } catch (err) {
      console.log(err);
    }
  };
  // const fetchLessonData = async (lessonID) => {
  //   try {
  //     console.log("Commencing lesson data fetch");
  //     const { data: lessonData } = await axios.get(`lesson/${lessonID}`);
  //     console.log(lessonData.lessonNotes);
  //     if (lessonData.lessonNotes) {
  //       const { lessonNotes } = lessonData;
  //       if (Object.keys(lessonNotes).length > 0) {
  //         const { content, _id: notesID } = lessonNotes;
  //         setContent(content);
  //         setNewContent(content);
  //         setNotesID(notesID);
  //         return;
  //       }
  //     }
  //     // Check if the lessonNotes array is empty.
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const enableEdit = () => {
    console.log("Enabling Editor");
    setReadOnly(false);
    setIsEditorEnabled(true);
    console.log(`Read Only  New State ${readOnly}`);
    console.log(`Is Editor Enabled ${isEditorEnabled}`);
  };
  const disableEdit = () => {
    console.log("Disabling Editor");
    setReadOnly(true);
    setIsEditorEnabled(false);
    console.log(`Is Editor Enabled ${isEditorEnabled}`);
  };

  const handleChange = useCallback((editorContent) => {
    if (areNotesPresent) {
      setNewContent(editorContent);
      console.log(`New Content ${editorContent}`);
    } else if (!areNotesPresent) {
      setContent(editorContent);
      console.log(`Original Content ${editorContent}`);
    }
  }, []);

  const handleSave = () => {
    if (areNotesPresent) {
      // We are dealing with an update.
      console.log(`Updating the lesson Notes to ${newContent}`);
      // setContent(newContent);
      disableEdit();
      handleUpdate(newContent, notesID);
      return;
    }
    console.log("Creating the lesson Notes");
    handleCreation(content, lessonID);
    disableEdit();
    return;
  };
  const handleCancel = () => {
    if (areNotesPresent) {
      setNewContent(null);
      disableEdit();
    } else if (!areNotesPresent) {
      setContent(null);
      disableEdit();
    }
  };
  const handleCreation = async (content, lessonID) => {
    console.log(`Data to the DB ${JSON.stringify(content, lessonID)}`);
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
      console.log(JSON.stringify(formData));
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
      const { lessonUrl, lessonID, lessonName, lessonNotes, lessonResources } =
        currentLesson;
      setLessonID(lessonID);
      console.log(`Original readOnly state ${readOnly}`);
      if (lessonNotes) {
        console.log(lessonNotes);
        setIsEditorEnabled(false);
        setAreNotesPresent(true);
        setNotesID(lessonNotes);
        console.log(`NotesID ${notesID}`);
        if (notesID !== null) {
          fetchLessonNotes(notesID);
        }
      }
    } else {
      setReadOnly(true);
      setAreNotesPresent(false);
    }
  }, [currentLesson]);
  return (
    <div className="w-full flex flex-col gap-4">
      <div id="unit content" className=" rounded-md">
        <ReactQuill
          value={areNotesPresent ? newContent : content}
          readOnly={readOnly}
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
