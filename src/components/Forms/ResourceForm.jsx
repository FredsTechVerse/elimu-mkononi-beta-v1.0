import React, { useState } from "react";
import {
  FormNavigation,
  Modal,
  Button,
  AlertBox,
  S3Uploader,
} from "../../components";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const ResourceForm = () => {
  const navigate = useNavigate();
  // FORM CONFIGURATIONS
  //=========================
  const [resourceName, setResourceName] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);
  //ALERT BOX CONFIGURATIONS
  //=========================
  const [response, setResponse] = useState(null);
  const [responseTracker, setResponseTracker] = useState(null);
  const [statusTracker, setStatusTracker] = useState(null);

  const savingFileToDB = async ({ resourceUrl }) => {
    try {
      console.log(`Image URL: ${resourceUrl}`);
      let resourceData = {
        resourceName,
        resourceUrl: resourceUrl,
      };

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        "/resources/new-resource",
        resourceData,
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
        setResponse("Error occured on the server.");
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
    if (resourceName !== null) {
      return true;
    }
    return false;
  };

  const saveResource = async (e) => {
    try {
      e.preventDefault();
      const validation = validateForm();
      if (validation && uploadSuccess) {
        savingFileToDB({ resourceUrl: resourceName });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    console.log(`Resource Name updated to : ${fileName}`);
    setResourceName(fileName);
  };

  return (
    <Modal>
      <div className="bg-slate-300  bg-opacity-50 flex flex-col justify-center items-center tablet:3/5 laptop:w-1/3 phone:w-3/4">
        <FormNavigation text="RESOURCE FORM" />
        <form encType="multipart/form-data" className="form-styling">
          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={response}
          />
          <div className="input-wrap">
            <label htmlFor="course" className="w-full ">
              File Details
            </label>
            <input
              className="input-styling w-full"
              id="course"
              type="text"
              placeholder="Enter file name"
              value={resourceName}
              onChange={(e) => {
                setResourceName(e.target.value);
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
            <Button
              type="button"
              text="Add Course"
              onClick={(e) => {
                saveResource(e);
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResourceForm;
