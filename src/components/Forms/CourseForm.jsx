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
const CourseForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);

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
      console.log("Course data has been successfully saved");
      navigate(-1);
    },
    onError: (error) => handleError(error),
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
          <div className="input-wrap">
            {fileName && uploadSuccess ? (
              <S3Uploader
                verifyUpload={verifyUpload}
                updateFileName={updateFileName}
              />
            ) : (
              <div className="flex flex-col w-full h-48 bg-slate-200 rounded-lg  text-center items-center justify-center">
                <p>Upload successfull!</p>
              </div>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton type="submit" text="Add Course" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseForm;
