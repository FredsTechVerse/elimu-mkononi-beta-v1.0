import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../controllers/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleError } from "../../controllers/handleErrors";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const CourseForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        saveCourse(e);
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

  // FORM CONFIGURATIONS
  //=========================
  const [courseTitle, setCourseTitle] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [fileName, setFileName] = useState(null);

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      queryClient.setQueryData(["courses", data._id], data);
      queryClient.invalidateQueries(["courses"], { exact: true });
      updateAlertBoxData({
        response: "Course saved successfully",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });

  const saveCourse = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      createCourseMutation.mutate({
        courseTitle: courseTitle,
        courseImage: fileName,
      });
    }
  };
  const isFormValid = () => {
    if (courseTitle !== null && uploadSuccess) {
      return true;
    }
    return false;
  };

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    setFileName(fileName);
  };

  return (
    <Modal>
      <div className="form-wrap h-[380px]">
        <FormNavigation text="COURSE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={saveCourse}
        >
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
          <div className="input-wrap ">
            {!uploadSuccess ? (
              <S3Uploader
                verifyUpload={verifyUpload}
                updateFileName={updateFileName}
              />
            ) : (
              <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg flex flex-col items-center gap-2 py-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <p className="text-center">
                  Course Image has been sucessfully uploaded
                </p>
              </div>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              text={
                createCourseMutation?.status === "loading"
                  ? "Adding course"
                  : "Add Course"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseForm;
