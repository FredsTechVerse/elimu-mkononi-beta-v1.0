import React, { useState, useEffect } from "react";
import { FormNavigation, Button, Modal, LoadingBtn } from "../../components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter } from "../../api/postData";

const ChapterForm = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  // A link will be used to redirect us to this particular point.
  const navigate = useNavigate();
  const { unitID } = useParams();
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmittted] = useState(false);
  // TRACKING LOCATION
  const location = useLocation();
  const from = location.state?.background?.pathname;

  const queryClient = useQueryClient();
  const createChapterMutation = useMutation({
    mutationFn: createChapter,
    onSuccess: (data) => {
      queryClient.setQueryData(["chapter", unitID], data);
      queryClient.invalidateQueries(["chapter"], { exact: true });
      navigate(from);
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
        <form className="form-styling">
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
            {!isFormSubmitted ? (
              <Button type="button" text="Save" onClick={fileUploadHandler} />
            ) : (
              <LoadingBtn action="Uploading" />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChapterForm;
