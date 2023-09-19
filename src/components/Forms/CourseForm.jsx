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

import { CourseFormSyntax } from "../../components";

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
    <CourseFormSyntax
      courseImage={courseImage}
      updateCourseImage={updateCourseImage}
      handleSubmit={handleSubmit}
      saveCourse={saveCourse}
      isEditEnabled={isEditEnabled}
      isCourseQueryEnabled={isCourseQueryEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      courseQuery={courseQuery}
      createCourseMutation={createCourseMutation}
      updateCourseMutation={updateCourseMutation}
      courseID={courseID}
    />
  );
};

export default CourseForm;
