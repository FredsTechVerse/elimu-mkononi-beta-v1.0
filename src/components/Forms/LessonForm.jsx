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
  const [lessonUrl, setLessonUrl] = useState("Test URL");
  const [thumbnails, setThumbnails] = useState({});
  // Prevents the scroll behaviour of our page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    console.log(`Thumbnails changed ${JSON.stringify(thumbnails)}`);
  }, [thumbnails]);
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

  const verifyUpload = () => {
    setUploadSucess(true);
  };
  const updateFileInfo = ({ thumbnails, title, localized, publishedAt }) => {
    console.log(
      `Youtube info i can utilize ${JSON.stringify({
        thumbnails,
        // title,
        // localized,
        // publishedAt,
      })}`
    );
    // Here is where i need to fetch the lesson url and append it accordingly.
    setThumbnails({ ...thumbnails });
  };

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["unitData"], { exact: true });
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
    },
  });
  const isFormValid = () => {
    if (
      lessonName !== null &&
      lessonNumber !== null &&
      lessonUrl !== null &&
      uploadSuccess
    ) {
      return true;
    }
    console.log("Validation Failed.");
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
        thumbnails: thumbnails,
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
            {!uploadSuccess ? (
              <YoutubeUploader
                verifyUpload={verifyUpload}
                updateFileInfo={updateFileInfo}
                videoTitle={lessonName}
              />
            ) : (
              <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg flex flex-col items-center gap-2 py-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <p className="text-center">
                  Lesson has been sucessfully uploaded
                </p>
              </div>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              disabled={uploadSuccess ? false : true}
              type="submit"
              submitting={createLessonMutation?.isLoading}
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
