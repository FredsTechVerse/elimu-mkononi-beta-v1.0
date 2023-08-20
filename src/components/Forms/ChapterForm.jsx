import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
  ActionBtn,
} from "../../components";
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
  const unitID = location.state?.unitID;
  const { chapterID } = location.state;
  const [isChapterQueryEnabled, setIsChapterQueryEnabled] = useState(
    chapterID !== undefined ? true : false
  );
  const [isEditEnabled, setIsEditEnabled] = useState(chapterID ? false : true);
  const {
    register,
    handleSubmit,
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

  const queryClient = useQueryClient();

  const chapterQuery = useQuery(
    ["chapter", chapterID],
    () => fetchChapterData({ chapterID }),
    {
      enabled: isChapterQueryEnabled,
      staleTime: 1000 * 60 * 60,
      retry: 1,
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
      setValue("unitID", chapterQuery?.data?.firstName);
      setValue("chapterNumber", chapterQuery?.data?.surname);
      setValue("chapterName", chapterQuery?.data?.contact);
      setValue("chapterDescription", chapterQuery?.data?.email);
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
        retryCreateChapterMutation(error.config.data); // Retry with captured form data
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
      queryClient.setQueryData(["chapter", unitID], data);
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
        retryUpdateChapterMutation(error.config.data); // Retry with captured form data
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

    if (!unitID) {
      if (!isChapterQueryEnabled) {
        createChapterMutation.mutate({
          unitID: unitID,
          chapterNumber: `${unitID}-${chapterNumber}`,
          chapterName: chapterName,
          chapterDescription: chapterDescription,
        });
        return;
      } else {
        updateChapterMutation.mutate({
          chapterID,
          chapterNumber: `${unitID}-${chapterNumber}`,
          chapterName,
          chapterDescription,
        });
        return;
      }
    }

    updateAlertBoxData({
      response: "No unit ID specified",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Chapter Form" />
        <form className="form-styling" onSubmit={handleSubmit(saveChapter)}>
          {/* FILE */}
          <div className="input-wrap gap-2">
            <label htmlFor="cNumber" className="w-full ">
              Chapter Details
            </label>
            <input
              disabled={true}
              className={`input-styling `}
              placeholder="Chapter Number"
              {...register("chapterNumber", {})}
            />
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Chapter Name"
              {...register("chapterName", {
                required: "This field is required ",
              })}
            />
            {errors.chapterName && (
              <ErrorMessage message={errors.chapterName?.message} />
            )}
            <textarea
              readOnly={!isEditEnabled}
              placeholder="Description"
              {...register("chapterDescription", {
                required: "This field is required ",
              })}
            ></textarea>
            {errors.chapterDescription && (
              <ErrorMessage message={errors.chapterDescription?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isChapterQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isChapterQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={unitID ? false : true}
                  isSubmitting={createChapterMutation.isLoading}
                  text={createChapterMutation.isLoading ? "Saving" : "Save"}
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
                isEditEnabled && isChapterQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateChapterMutation.isLoading}
                text={updateChapterMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  chapterQuery.refetch();
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

export default ChapterForm;
