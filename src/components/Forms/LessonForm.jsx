import React, { useState, useEffect, useRef } from "react";
import { LessonFormSyntax } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLesson,
  updateLesson,
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
  const isLessonQueryEnabled = lessonID ? true : false;

  const [isEditEnabled, setIsEditEnabled] = useState(lessonID ? false : true);
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
      lessonName: "",
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
    <LessonFormSyntax
      watch={watch}
      handleSubmit={handleSubmit}
      saveLesson={saveLesson}
      lessonUrl={lessonUrl}
      isEditEnabled={isEditEnabled}
      isLessonQueryEnabled={isLessonQueryEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      lessonQuery={lessonQuery}
      createLessonMutation={createLessonMutation}
      updateLessonMutation={updateLessonMutation}
    />
  );
};

export default LessonForm;
