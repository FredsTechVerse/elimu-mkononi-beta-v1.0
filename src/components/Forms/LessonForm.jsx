import React, { useState, useEffect, useRef } from "react";
import {
  ErrorMessage,
  Modal,
  SubmitButton,
  YoutubeUploader,
} from "../../components";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const LessonForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const { background, chapterID } = location?.state;
  const { updateAlertBoxData } = useAlertBoxContext();

  const lessonTotals = location?.state?.lessonTotals;
  const lessonState = { pathname, background, chapterID, lessonTotals };
  const queryClient = useQueryClient();
  const formRef = useRef();

  const [lessonUrl, setLessonUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessonName: "Elimu Mkononi",
      lessonNumber: lessonTotals + 1,
      lessonType: "link",
      youtubeUrl: "",
    },
  });
  // Prevents the scroll behaviour of our page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const updateFileInfo = ({ videoUrl }) => {
    setLessonUrl(videoUrl);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveLesson)(e);
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
        response: "Lesson has been saved.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryMutation(error.config.data);
      }
    },
  });

  const retryMutation = (formData) => {
    createLessonMutation.mutate({
      lessonNumber: formData.lessonTotals,
      lessonName: formData.lessonName,
      lessonUrl: formData.lessonUrl,
      chapterID: formData.chapterID,
    });
  };

  const saveLesson = async (data) => {
    const { lessonName, lessonNumber, youtubeUrl } = data;
    if (chapterID && typeof lessonTotals !== "string") {
      if (watch("lessonType") === "link") {
        createLessonMutation.mutate({
          lessonNumber: `${chapterID}-${lessonNumber}`,
          lessonName: lessonName,
          lessonUrl: youtubeUrl,
          chapterID: chapterID,
        });
      } else {
        createLessonMutation.mutate({
          lessonNumber: `${chapterID}-${lessonNumber}`,
          lessonName: lessonName,
          lessonUrl: lessonUrl,
          chapterID: chapterID,
        });
      }
      return;
    }

    updateAlertBoxData({
      response: "Chapter ID / Lesson Number has not been specified.",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <Modal>
      <div className={`form-wrap`}>
        <div className=" relative w-full flex justify-center items-center text-lg font-bold text-white uppercase  px-2 py-5  rounded-t-2xl ">
          lesson form
          <button
            className="absolute top-4.5 right-3"
            onClick={() => navigate(background)}
          >
            <XCircleIcon className="icon-styling text-slate-800 " />
          </button>
        </div>
        <form
          encType="multipart/form-data"
          className="form-styling gap-4"
          text="Lesson form"
          onSubmit={handleSubmit(saveLesson)}
        >
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="lessonDetails" className="w-full ">
              Lesson Details
            </label>
            <input
              className={`input-styling `}
              disabled={true}
              placeholder="Lesson Number"
              {...register("lessonNumber", {})}
            />
            <input
              className="input-styling"
              placeholder="Lesson Name"
              {...register("lessonName", {
                required: "This field is required ",
              })}
            />

            {errors.lessonName && (
              <ErrorMessage message={errors.lessonName?.message} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Lesson Type
            </label>

            <select
              className="input-styling  mb-5"
              {...register("lessonType", {
                required: "This field is required ",
              })}
            >
              <option value="link">Link</option>
              <option value="file">File</option>
            </select>
            {errors.lessonType && (
              <ErrorMessage message={errors.lessonType?.message} />
            )}
          </div>
          {watch("lessonType") === "link" ? (
            <div className="input-wrap">
              <input
                className="input-styling"
                placeholder="Enter a youtube link"
                {...register("youtubeUrl", {
                  required: "This field is required ",
                })}
              />

              {errors.lessonUrl && (
                <ErrorMessage message={errors.lessonUrl?.message} />
              )}
            </div>
          ) : (
            <div className="input-wrap ">
              {!lessonUrl ? (
                <YoutubeUploader
                  updateFileInfo={updateFileInfo}
                  lessonState={lessonState}
                  videoTitle={register("lessonName").name}
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
                  <p className="text-center">Lesson has been uploaded</p>
                </div>
              )}
            </div>
          )}

          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              disabled={
                chapterID && typeof lessonTotals !== "string" ? false : true
              }
              type="submit"
              isSubmitting={createLessonMutation?.isLoading}
              text={
                createLessonMutation?.status === "loading" ? "Saving" : "Save"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
