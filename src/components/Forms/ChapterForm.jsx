import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  LoadingBtn,
} from "../../components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleError } from "../../controllers/handleErrors";
import { createChapter } from "../../controllers/postData";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const ChapterForm = () => {
  // A link will be used to redirect us to this particular point.
  const navigate = useNavigate();
  const { unitID } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmittted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        fileUploadHandler(e);
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

  // TRACKING LOCATION
  const location = useLocation();
  const from = location.state?.background?.pathname;

  const queryClient = useQueryClient();
  const createChapterMutation = useMutation({
    mutationFn: createChapter,
    onSuccess: (data) => {
      queryClient.setQueryData(["chapter", unitID], data);
      queryClient.invalidateQueries(["unitData"]);
      updateAlertBoxData({
        response: "Chapter saved successfully ",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(from);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createChapterMutation.mutate({
          unitID: unitID,
          chapterNumber: `${unitID}-${chapterNumber}`,
          chapterName: chapterName,
          chapterDescription: chapterDescription,
        });
      }
    },
  });

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    setIsFormSubmittted(true);
    createChapterMutation.mutate({
      unitID: unitID,
      chapterNumber: `${unitID}-${chapterNumber}`,
      chapterName: chapterName,
      chapterDescription: chapterDescription,
    });
  };

  return (
    <Modal>
      <div className="form-wrap h-[400px]">
        <FormNavigation text="Chapter Form" />
        <form className="form-styling" onSubmit={fileUploadHandler}>
          {/* FILE */}
          <div className="input-wrap gap-2">
            <label htmlFor="cNumber" className="w-full ">
              Chapter Details
            </label>
            <input
              className="input-styling"
              id="cNumber"
              type="number"
              placeholder="Chapter Number"
              value={chapterNumber}
              onChange={(e) => {
                setChapterNumber(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              id="fName"
              type="Text"
              placeholder="Chapter Name"
              value={chapterName}
              onChange={(e) => {
                setChapterName(e.target.value);
              }}
              required
            ></input>

            <textarea
              id="lName"
              type="Text"
              placeholder="Description"
              value={chapterDescription}
              onChange={(e) => {
                setChapterDescription(e.target.value);
              }}
              required
            ></textarea>
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap ">
            <SubmitButton
              type="submit"
              isSubmitting={createChapterMutation?.isLoading}
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
