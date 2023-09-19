import React, { useState, useEffect, useRef } from "react";
import { ChapterFormSyntax } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchChapterData,
  createChapter,
  updateChapter,
  handleError,
} from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const ChapterForm = () => {
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.background?.pathname;
  const chapterTotals = location.state?.chapterTotals;
  const { chapterID, unitID } = location.state;
  console.log({ chapterID });
  const isChapterQueryEnabled = chapterID ? true : false;

  const [isEditEnabled, setIsEditEnabled] = useState(chapterID ? false : true);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chapterNumber: chapterTotals + 1,
      chapterName: "",
      chapterDescription: "",
    },
  });

  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveChapter)(e);
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

  const chapterQuery = useQuery(
    ["chapter", chapterID],
    () => fetchChapterData({ chapterID }),
    {
      enabled: isChapterQueryEnabled,
      staleTime: 1000 * 60 * 60,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["chapter", chapterID], {
            exact: true,
          });
        }
      },
    }
  );

  // Updates accordingly  after fetch
  useEffect(() => {
    if (chapterQuery?.status === "success" && chapterQuery?.data) {
      setValue(
        "chapterNumber",
        chapterQuery?.data?.chapterNumber.split("-")[1]
      );
      setValue("chapterName", chapterQuery?.data?.chapterName);
      setValue("chapterDescription", chapterQuery?.data?.chapterDescription);
    }
  }, [chapterID, chapterQuery?.status]);

  const createChapterMutation = useMutation({
    mutationFn: createChapter,
    onSuccess: (data) => {
      queryClient.setQueryData(["chapter", unitID], data);
      queryClient.invalidateQueries(["unitData"]);
      updateAlertBoxData({
        response: "Chapter has been saved",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(from);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryCreateChapterMutation(error.config.data);
      }
    },
  });

  const retryCreateChapterMutation = (formData) => {
    createChapterMutation.mutate({
      unitID: formData.unitID,
      chapterNumber: `${formData.unitID}-${formData.chapterNumber}`,
      chapterName: formData.chapterName,
      chapterDescription: formData.chapterDescription,
    });
  };

  const updateChapterMutation = useMutation({
    mutationFn: updateChapter,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["unitData"]);
      updateAlertBoxData({
        response: "Chapter has been updated",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(from);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUpdateChapterMutation(error.config.data);
      }
    },
  });

  const retryUpdateChapterMutation = (formData) => {
    createChapterMutation.mutate({
      chapterID: formData.chapterID,
      chapterNumber: `${formData.unitID}-${formData.chapterNumber}`,
      chapterName: formData.chapterName,
      chapterDescription: formData.chapterDescription,
    });
  };

  const saveChapter = async (data) => {
    const { chapterName, chapterNumber, chapterDescription } = data;
    if (!isChapterQueryEnabled) {
      if (unitID) {
        console.log("Creating chapter");
        console.log({
          unitID: unitID,
          chapterNumber: `${unitID}-${chapterNumber}`,
          chapterName: chapterName,
          chapterDescription: chapterDescription,
        });
        createChapterMutation.mutate({
          unitID: unitID,
          chapterNumber: `${unitID}-${chapterNumber}`,
          chapterName: chapterName,
          chapterDescription: chapterDescription,
        });
        return;
      } else {
        updateAlertBoxData({
          response: "No unit ID specified",
          isResponse: true,
          status: "failure",
          timeout: 4500,
        });
      }
    } else {
      console.log("Updating chapter");
      console.log({
        chapterID,
        chapterNumber: `${unitID}-${chapterNumber}`,
        chapterName,
        chapterDescription,
      });
      updateChapterMutation.mutate({
        chapterID,
        chapterName,
        chapterDescription,
      });
      return;
    }
  };

  return (
    <ChapterFormSyntax
      unitID={unitID}
      handleSubmit={handleSubmit}
      saveChapter={saveChapter}
      isEditEnabled={isEditEnabled}
      isChapterQueryEnabled={isChapterQueryEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      chapterQuery={chapterQuery}
      createChapterMutation={createChapterMutation}
      updateChapterMutation={updateChapterMutation}
    />
  );
};

export default ChapterForm;
