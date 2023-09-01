import React, { useState, useEffect, useRef } from "react";
import {
  ErrorMessage,
  Modal,
  SubmitButton,
  YoutubeUploader,
  ActionBtn,
} from "../../components";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLesson,
  updateLesson,
  deleteLesson,
  fetchLessonData,
  handleError,
} from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const LessonForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formRef = useRef();
  const { pathname } = location;
  const lessonTotals = location.state?.lessonTotals;
  const { background, chapterID, lessonID } = location.state;
  const { updateAlertBoxData } = useAlertBoxContext();
  const [lessonUrl, setLessonUrl] = useState("");
  const lessonState = { pathname, background, chapterID, lessonTotals };
  const queryClient = useQueryClient();
  const [isLessonQueryEnabled, setIsUserLessonQueryEnabled] = useState(
    lessonID ? true : false
  );

  const [isEditEnabled, setIsEditEnabled] = useState(lessonID ? false : true);

  console.log({ lessonID, isLessonQueryEnabled });

  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessonNumber: lessonTotals + 1,
      lessonName: "Enter Lesson Name",
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

  //  Fetches the user data is need be
  const lessonQuery = useQuery(
    ["lesson", lessonID],
    () => fetchLessonData({ lessonID }),
    {
      enabled: isLessonQueryEnabled,
      staleTime: 1000 * 60 * 60,
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["lesson", lessonID], { exact: true });
        }
      },
    }
  );

  // Updates accordingly  after fetch
  useEffect(() => {
    if (lessonQuery?.status === "success" && lessonQuery?.data) {
      console.log("Lesson Data");
      console.log({ lessonData: lessonQuery?.data });
      setValue("lessonNumber", lessonQuery?.data?.lessonNumber.split("-")[1]);
      setValue("lessonName", lessonQuery?.data?.lessonName);
      setValue("youtubeUrl", lessonQuery?.data?.lessonUrl);
    }
  }, [lessonID, lessonQuery?.status]);

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
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryCreatingLessonMutation(error.config.data);
      }
    },
  });

  const retryCreatingLessonMutation = (formData) => {
    createLessonMutation.mutate({
      lessonNumber: formData.lessonTotals,
      lessonName: formData.lessonName,
      lessonUrl: formData.lessonUrl,
      chapterID: formData.chapterID,
    });
  };

  const updateLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["unitData"]);
      updateAlertBoxData({
        response: "Lesson has been saved.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUpdatingLessonMutation(error.config.data);
      }
    },
  });

  const retryUpdatingLessonMutation = (formData) => {
    createLessonMutation.mutate({
      lessonNumber: formData.lessonTotals,
      lessonName: formData.lessonName,
      lessonUrl: formData.lessonUrl,
      chapterID: formData.chapterID,
    });
  };

  const saveLesson = async (data) => {
    const { lessonName, lessonNumber, youtubeUrl } = data;
    if (!isLessonQueryEnabled) {
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
    } else {
      if (typeof lessonTotals !== "string") {
        if (watch("lessonType") === "link") {
          updateLessonMutation.mutate({
            lessonNumber: `${chapterID}-${lessonNumber}`,
            lessonName,
            lessonUrl: youtubeUrl,
            lessonID,
          });
        } else {
          updateLessonMutation.mutate({
            lessonNumber: `${chapterID}-${lessonNumber}`,
            lessonName,
            lessonUrl,
            lessonID,
          });
        }
        return;
      }
    }

    updateAlertBoxData({
      response: "Chapter ID has not been specified.",
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
              readOnly={!isEditEnabled}
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
              disabled={!isEditEnabled}
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
                readOnly={!isEditEnabled}
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

          <div className="cta-wrap">
            <div
              className={`${
                !isLessonQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isLessonQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={lessonUrl || watch("youtubeUrl") ? false : true}
                  isSubmitting={createLessonMutation.isLoading}
                  text={createLessonMutation.isLoading ? "Saving" : "Save"}
                />
              ) : (
                <ActionBtn
                  type="button"
                  onClick={() => {
                    enableEdit();
                  }}
                  text="Edit"
                />
              )}
            </div>

            <div
              className={`${
                isEditEnabled && isLessonQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateLessonMutation.isLoading}
                text={updateLessonMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  lessonQuery.refetch();
                }}
                text="cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
