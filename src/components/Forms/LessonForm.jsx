import React, { useState, useEffect } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  AlertBox,
  S3Uploader,
} from "../../components";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";

const LessonForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  const { chapterID } = useParams();

  //Form Variables
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");

  // Alert Box Config
  const [response, setResponse] = useState(null);
  const [responseTracker, setResponseTracker] = useState(null);
  const [statusTracker, setStatusTracker] = useState(null);

  //Dropzone Config
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [fileName, setFileName] = useState(null);

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    console.log(`Filename ${fileName}`);
    setFileName(fileName);
  };

  const saveLessonToDB = async ({ lessonNumber, lessonName, lessonUrl }) => {
    try {
      const formData = new FormData();
      formData.append("chapterID", chapterID);
      formData.append("lessonNumber", `${chapterID}-${lessonNumber}`);
      formData.append("lessonName", lessonName);
      formData.append("lessonUrl", lessonUrl); //Jackpot. Defines our fieldname which is crawled by multer to pick out this file for upload.

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post("/lesson/new-lesson", formData, config);
      const { status } = response;

      if (status === 201) {
        setResponse("Data saved successfully to DB.");
        setStatusTracker(true);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
          navigate(-1);
        }, 1200);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        setResponse("An error occured while uploading the file to the backend");
        setStatusTracker(false);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
        }, 2500);
      } else {
        console.log(err);
      }
    }
  };

  const validateForm = () => {
    if (lessonName !== null && lessonNumber !== null && fileName !== null) {
      return true;
    }
    console.log("Validation Failed.");
    return false;
  };

  const saveLesson = async (e) => {
    // Prevents default behaviour of our form
    e.preventDefault();
    // Fetches a signedUrl
    const isFormValid = validateForm();
    if (isFormValid == true) {
      saveLessonToDB({
        lessonNumber: lessonNumber,
        lessonName: lessonName,
        lessonUrl: fileName,
      });
      return;
    }
    setResponse("Kindly fill all details correctly.");
    setStatusTracker(false);
    setResponseTracker(true);
    setTimeout(() => {
      setResponseTracker(false);
    }, 2500);
  };

  return (
    <Modal>
      <div className="form-wrap h-[450px]">
        <FormNavigation text="Lesson Form" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          text="Lesson form"
        >
          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={response}
          />
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
              <SubmitButton type="button" text="Save" onClick={saveLesson} />
            ) : (
              <LoadingBtn action="Uploading" />
            )} */}

            <SubmitButton type="button" text="Save" onClick={saveLesson} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
