import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
} from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const ChapterForm = () => {
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.background?.pathname;

  const chapterTotals = location?.state?.chapterTotals;
  const unitID = location?.state?.unitID;
  // const [chapterName, setChapterName] = useState("");
  // const [chapterDescription, setChapterDescription] = useState("");

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
        retryMutation(error.config.data); // Retry with captured form data
      }
    },
  });

  const retryMutation = (formData) => {
    createChapterMutation.mutate({
      unitID: formData.unitID,
      chapterNumber: `${formData.unitID}-${formData.chapterNumber}`,
      chapterName: formData.chapterName,
      chapterDescription: formData.chapterDescription,
    });
  };

  const saveChapter = async (data) => {
    console.log(data);
    console.log({ unitID });
    const { chapterName, chapterNumber, chapterDescription } = data;

    if (unitID) {
      createChapterMutation.mutate({
        unitID: unitID,
        chapterNumber: `${unitID}-${chapterNumber}`,
        chapterName: chapterName,
        chapterDescription: chapterDescription,
      });
      return;
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
              placeholder="Description"
              {...register("chapterDescription", {
                required: "This field is required ",
              })}
            ></textarea>
            {errors.chapterDescription && (
              <ErrorMessage message={errors.chapterDescription?.message} />
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap ">
            <SubmitButton
              type="submit"
              isSubmitting={createChapterMutation?.isLoading}
              disabled={unitID ? false : true}
              text={
                createChapterMutation?.status === "loading" ? "Saving" : "Save"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChapterForm;
