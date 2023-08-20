import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  verifyAccess,
  createCourse,
  fetchCourseData,
  updateCourse,
  handleError,
} from "../../controllers";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

import {
  ErrorMessage,
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
  ActionBtn,
} from "../../components";

const CourseForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fileName, setFileName] = useState("");
  const [oldImage, setOldImage] = useState("");
  const { updateAlertBoxData } = useAlertBoxContext();
  const { courseID, background } = location.state;
  const [isCourseQueryEnabled, setIsCourseQueryEnabled] = useState(
    courseID ? true : false
  );
  const [isEditEnabled, setIsEditEnabled] = useState(courseID ? false : true);
  const [isImageEditEnabled, setIsImageEditEnabled] = useState(false);
  // console.log({ courseID, isCourseQueryEnabled });
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseTitle: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const courseQuery = useQuery(
    ["course", courseID],
    () => fetchCourseData({ courseID }),
    {
      enabled: isCourseQueryEnabled,
      staleTime: 1000 * 60 * 60,
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["course", courseID], { exact: true });
        }
      },
    }
  );

  // Updates accordingly  after fetch
  useEffect(() => {
    console.log({ courseQuery: courseQuery?.data });
    if (courseQuery?.status === "success" && courseQuery?.data) {
      console.log({ courseData: courseQuery?.data });
      setValue("courseTitle", courseQuery?.data?.courseTitle);
      setFileName(courseQuery?.data?.couseImage);
      setOldImage(courseQuery?.data?.couseImage);
    }
  }, [courseID, courseQuery?.status]);

  // Updates accordingly  after fetch
  useEffect(() => {
    console.log({ courseQuery: courseQuery?.data });
    if (courseQuery?.status === "success" && courseQuery?.data) {
      console.log({ courseData: courseQuery?.data });
      setValue("courseTitle", courseQuery?.data?.courseTitle);
      setFileName(courseQuery?.data?.couseImage);
      setOldImage(courseQuery?.data?.couseImage);
    }
  }, []);

  const accessQuery = useQuery(["accessVerification"], () => verifyAccess(), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveCourse)(e);
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

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      queryClient.setQueryData(["courses", data._id], data);
      queryClient.invalidateQueries(["courses"], { exact: true });
      updateAlertBoxData({
        response: "Course has been saved.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryMutation(error.config.data); // Retry with captured form data
      }
    },
  });

  const retryMutation = (formData) => {
    createCourseMutation.mutate({
      courseTitle: formData.courseTitle,
      courseImage: formData.courseImage,
    });
  };

  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["courses"], { exact: true });
      queryClient.invalidateQueries(["course", courseID], { exact: true });

      updateAlertBoxData({
        response: "Course has been updated.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUpdatingCourseMutation(error.config.data); // Retry with captured form data
      }
    },
  });

  const retryUpdatingCourseMutation = (formData) => {
    updateCourseMutation.mutate({
      courseID: formData.courseID,
      courseTitle: formData.courseTitle,
      courseImage: formData.courseImage,
    });
  };

  const saveCourse = async (data) => {
    const { courseTitle } = data;
    // if (fileName) {
    if (!isCourseQueryEnabled) {
      createCourseMutation.mutate({
        courseTitle,
        courseImage,
      });
      return;
    } else {
      updateCourseMutation.mutate({
        courseID,
        courseTitle,
      });
      return;
    }
    // }
    // updateAlertBoxData({
    //   response: "File name is missing",
    //   isResponse: true,
    //   status: "failure",
    //   timeout: 4500,
    // });
  };

  // CALLBACK FUNCTIONS FROM S3 UPLOADER.
  const updateFileName = (imageURl) => {
    setFileName(imageURl);
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="COURSE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveCourse)}
        >
          {/* {!isImageEditEnabled || (isCourseQueryEnabled && oldImage) ? (
            <div className="flex flex-col">
              <img
                src={`https://elimu-mkononi.s3.af-south-1.amazonaws.com/${oldImage}`}
                className="bg-gray-300 h-36 w-72 tablet:w-[360px] rounded-xl object-cover  bg-cover bg-center"
                alt="courseImage"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (!isImageEditEnabled) {
                      setIsImageEditEnabled(true);
                    } else {
                      setIsImageEditEnabled(false);
                      // Proceed to saving the new info.
                    }
                  }}
                >
                  {!isImageEditEnabled ? "Edit" : "Save"}
                </button>
              </div>
            </div>
          ) : isImageEditEnabled || (isCourseQueryEnabled && !fileName) ? (
            <div className="h-36 w-72 tablet:w-[360px]">
              <S3Uploader
                isTokenActive={accessQuery.status === "success"}
                updateFileName={updateFileName}
              />
            </div>
          ) : (
            <div className={`w-72 tablet:w-[360px] my-3  `}>
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
                <p className="text-center">Course Image has been uploaded</p>
              </div>
            </div>
          )} */}

          <div className="input-wrap">
            <label htmlFor="course">Course Details</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Course Title"
              {...register("courseTitle", {
                required: "This field is required ",
              })}
            />
            {errors.courseTitle && (
              <ErrorMessage message={errors.courseTitle?.message} />
            )}
          </div>

          <div
            className={`${
              isCourseQueryEnabled ? "hidden" : "flex"
            } input-wrap `}
          >
            {!fileName ? (
              <S3Uploader
                isTokenActive={accessQuery.status === "success"}
                updateFileName={updateFileName}
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
                <p className="text-center">Course Image has been uploaded</p>
              </div>
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isCourseQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isCourseQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={fileName ? false : true}
                  isSubmitting={createCourseMutation.isLoading}
                  text={createCourseMutation.isLoading ? "Saving" : "Save"}
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
                isEditEnabled && isCourseQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateCourseMutation.isLoading}
                text={updateCourseMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  courseQuery.refetch();
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

export default CourseForm;
