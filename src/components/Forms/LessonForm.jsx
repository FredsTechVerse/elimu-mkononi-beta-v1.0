import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
} from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson } from "../../controllers/postData";
const LessonForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { chapterID } = useParams();
  const formRef = useRef();
  // Prevents the scroll behaviour of our page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
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

  //Form Variables
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  //Dropzone Config
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [fileName, setFileName] = useState(null);
  const verifyUpload = () => {
    setUploadSucess(true);
  };
  const updateFileName = (fileName) => {
    setFileName(fileName);
  };
  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["unitData"], { exact: true });
      navigate(-1);
    },
  });
  const isFormValid = () => {
    if (
      lessonName !== null &&
      lessonNumber !== null &&
      fileName !== null &&
      uploadSuccess
    ) {
      return true;
    }
    console.log("Validation Failed.");
    return false;
  };

  const saveLesson = async (e) => {
    // Prevents default behaviour of our form
    e.preventDefault();
    // Fetches a signedUrl
    if (isFormValid) {
      createLessonMutation.mutate({
        lessonNumber: lessonNumber,
        lessonName: lessonName,
        lessonUrl: fileName,
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
          className="form-styling"
          text="Lesson form"
          onSubmit={saveLesson}
        >
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="lNumber" className="w-full ">
              Lesson Details
            </label>
            <input
              className="input-styling"
              id="cNumber"
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
              id="lName"
              type="Text"
              placeholder="Lesson Name"
              value={lessonName}
              onChange={(e) => {
                setLessonName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="input-wrap ">
            <S3Uploader
              verifyUpload={verifyUpload}
              updateFileName={updateFileName}
            />
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton type="submit" text="Save" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
