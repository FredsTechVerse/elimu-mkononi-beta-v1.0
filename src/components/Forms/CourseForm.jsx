import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
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
  FileUpdater,
} from "../../components";

const CourseForm = () => {
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [courseImage, setCourseImage] = useState("");
  const { updateAlertBoxData } = useAlertBoxContext();
  const { courseID, background } = location.state;
  const [isCourseQueryEnabled, setIsCourseQueryEnabled] = useState(
    courseID ? true : false
  );
  const [isEditEnabled, setIsEditEnabled] = useState(courseID ? false : true);
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const updateCourseImage = (imageURL) => {
    setCourseImage(imageURL);
    enableEdit();
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
    if (courseQuery?.status === "success" && courseQuery?.data) {
      setValue("courseTitle", courseQuery?.data?.courseTitle);
      setCourseImage(courseQuery?.data?.courseImage);
    }
  }, [courseID, courseQuery?.status]);

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
    if (courseImage) {
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
          courseImage,
        });
        return;
      }
    }
    updateAlertBoxData({
      response: "CourseImage is missing",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
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

          <div className={` input-wrap `}>
            {!courseImage ? (
              <S3Uploader updateFileName={updateCourseImage} />
            ) : (
              <FileUpdater
                fileName={courseImage}
                updateImage={updateCourseImage}
                queryKey={[["course", courseID]]}
              />
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
                  disabled={courseImage ? false : true}
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
