import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  YoutubeUploader,
} from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson } from "../../controllers/postData";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const LessonForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { chapterID } = useParams();
  const formRef = useRef();
  const { updateAlertBoxData } = useAlertBoxContext();

  //Form Variables
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  //Dropzone Config
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [lessonUrl, setLessonUrl] = useState("");
  // Prevents the scroll behaviour of our page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.typpe === "submit") {
        saveLesson(e);
      }
    };
    if (formRef.current) {
      formRef.current.addEventListener("submit", handleKeyPress);
    }
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener("submit", handleKeyPress);
      }
    };
  }, []);

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["unitData"]);
      updateAlertBoxData({
        response: "Lesson has been saved successfully",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createLessonMutation.mutate({
          lessonNumber: lessonNumber,
          lessonName: lessonName,
          lessonUrl: lessonUrl,
          chapterID: chapterID,
        });
      }
    },
  });
  const isFormValid = () => {
    console.log("Running form validation");
    if (
      lessonName !== null &&
      lessonNumber !== null &&
      lessonUrl !== null &&
      uploadSuccess
    ) {
      return true;
    }
    updateAlertBoxData({
      response: "Some input fields are empty",
      isResponse: true,
      status: "success",
      timeout: 3000,
    });
    return false;
  };

  const saveLesson = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      createLessonMutation.mutate({
        lessonNumber: lessonNumber,
        lessonName: lessonName,
        lessonUrl: lessonUrl,
        chapterID: chapterID,
      });
    }
  };

  return (
    <Modal>
      <div className="form-wrap h-[470px]">
        <FormNavigation text="Lesson Form" />
        <form
          encType="multipart/form-data"
          className="form-styling gap-4"
          text="Lesson form"
          onSubmit={saveLesson}
        >
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="lessonDetails" className="w-full ">
              Lesson Details
            </label>
            <input
              className="input-styling"
              id="lessonDetails"
              type="number"
              placeholder="Lesson Number"
              value={lessonNumber}
              onChange={(e) => {
                setLessonNumber(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              type="Text"
              placeholder="Lesson Name"
              value={lessonName}
              onChange={(e) => {
                setLessonName(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              type="Text"
              placeholder="Enter a youtube link"
              value={lessonUrl}
              onChange={(e) => {
                setLessonUrl(e.target.value);
              }}
              required
            ></input>
          </div>

          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              disabled={isFormValid ? false : true}
              type="submit"
              isSubmitting={createLessonMutation?.isLoading}
              text={
                createLessonMutation?.status === "loading"
                  ? "Adding Lesson"
                  : "Add Lesson"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
