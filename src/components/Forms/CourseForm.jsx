import React, { useState } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  AlertBox,
  S3Uploader,
} from "../../components";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const CourseForm = () => {
  const navigate = useNavigate();
  // FORM CONFIGURATIONS
  //=========================
  const [courseTitle, setCourseTitle] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [fileName, setFileName] = useState(null);
  //ALERT BOX CONFIGURATIONS
  //=========================
  const [response, setResponse] = useState(null);
  const [responseTracker, setResponseTracker] = useState(null);
  const [statusTracker, setStatusTracker] = useState(null);

  const savingFileToDB = async ({ imageUrl }) => {
    try {
      console.log(`Image URL: ${imageUrl}`);
      let courseData = {
        courseTitle,
        courseImage: imageUrl,
      };

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        "/course/new-course",
        courseData,
        config
      );

      const { status } = response;

      if (status === 201) {
        setResponse("Course has been successfully updated.");
        setStatusTracker(true);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
        }, 2500);
        navigate(-1);
        setReturnReason("Operation Successfull");
        return;
      }
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        setResponse("This record already exists.");
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
    if (courseTitle !== null) {
      return true;
    }
    return false;
  };

  const saveCourse = async (e) => {
    try {
      // Prevent default behaviour of our form of refreshing page.
      e.preventDefault();
      const validation = validateForm();
      if (validation && uploadSuccess) {
        console.log("Saving course to db");
        savingFileToDB({ imageUrl: fileName });
      }
    } catch (err) {
      console.log("Error occured during upload process.");
      console.log(err);
    }
  };

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    console.log(fileName);
    setFileName(fileName);
  };

  return (
    <Modal>
      <div className="form-wrap h-[380px]">
        <FormNavigation text="COURSE FORM" />
        <form encType="multipart/form-data" className="form-styling">
          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={response}
          />
          <div className="input-wrap">
            <label htmlFor="course">Course Details</label>
            <input
              className="input-styling"
              id="course"
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => {
                setCourseTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-wrap">
            <S3Uploader
              verifyUpload={verifyUpload}
              updateFileName={updateFileName}
            />
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="button"
              text="Add Course"
              onClick={(e) => {
                saveCourse(e);
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseForm;
