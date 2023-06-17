import React, { useState, useEffect } from "react";
import {
  FormNavigation,
  Modal,
  Button,
  AlertBox,
  S3Uploader,
} from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson } from "../../api/postData";
const LessonForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { chapterID } = useParams();
  // Prevents the scroll behaviour of our page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  //Form Variables
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  //Dropzone Config
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [fileName, setFileName] = useState(null);
  const verifyUpload = () => {
    setUploadSucess(true);
  };
  const updateFileName = (fileName) => {
    setFileName(fileName);
  };
  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["unitData"], { exact: true });
      navigate(-1);
    },
  });
  const isFormValid = () => {
    if (
      lessonName !== null &&
      lessonNumber !== null &&
      fileName !== null &&
      uploadSuccess
    ) {
      return true;
    }
    console.log("Validation Failed.");
    return false;
  };

  const saveLesson = async (e) => {
    // Prevents default behaviour of our form
    e.preventDefault();
    // Fetches a signedUrl
    if (isFormValid) {
      createLessonMutation.mutate({
        lessonNumber: lessonNumber,
        lessonName: lessonName,
        lessonUrl: fileName,
        chapterID: chapterID,
      });
    }
  };

  return (
    <Modal>
      <div className="bg-slate-300  bg-opacity-50 flex flex-col justify-center items-center tablet:3/5 laptop:w-1/3 phone:w-full">
        <FormNavigation text="Lesson Form" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          text="Lesson form"
        >
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="lNumber" className="w-full ">
              Lesson Details
            </label>
            <input
              className="input-styling"
              id="cNumber"
              type="number"
              placeholder="Lesson Number"
              value={lessonNumber}
              onChange={(e) => {
                setLessonNumber(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              id="lName"
              type="Text"
              placeholder="Lesson Name"
              value={lessonName}
              onChange={(e) => {
                setLessonName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="input-wrap ">
            <S3Uploader
              verifyUpload={verifyUpload}
              updateFileName={updateFileName}
            />
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            {/* {uploadSuccess ? (
              <Button type="button" text="Save" onClick={saveLesson} />
            ) : (
              <LoadingBtn action="Uploading" />
            )} */}

            <Button type="button" text="Save" onClick={saveLesson} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
