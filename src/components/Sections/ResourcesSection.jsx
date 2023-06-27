import React, { useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { NavBgBtn, S3Uploader } from "..";
import axios from "../../axios";
const ResourcesSection = () => {
  const { lessonID, lessonResources } = useOutletContext();
  const { fileName, setFileName } = useState("");
  // console.log(`List of lesson resources ID'S ${lessonResources}`);
  const [lessonData, setLessonData] = useState({});

  const saveResourceToDB = async ({ resourceName }) => {
    try {
      const formData = new FormData();
      formData.append("lessonID", lessonID);
      formData.append("resourceName", resourceName);
      formData.append("resouceUrl", resourceUrl); //Jackpot. Defines our fieldname which is crawled by multer to pick out this file for upload.

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        "/lesson/new-resource",
        formData,
        config
      );
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

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    console.log(`Filename ${fileName}`);
    setFileName(fileName);
  };

  if (lessonResources?.length > 0) {
    return (
      <div className="w-full flex-row-centered uppercase text-black">
        {lessonData?.lessonResources.map((resource, resourceIndex) => {
          return (
            <li className="" key={resourceIndex}>
              <DocumentTextIcon className="icon-styling" />{" "}
              {resource.resourceName}
            </li>
          );
        })}

        {/* If cleared , you can add a resource or delete it . */}
        <NavBgBtn to="new-resource" text="New Resource" />
      </div>
    );
  } else {
    return (
      <div className="flex-col-centered w-full h-full bg-slate-200 rounded-lg">
        <S3Uploader
          verifyUpload={verifyUpload}
          updateFileName={updateFileName}
        />
      </div>
    );
  }
};

export default ResourcesSection;
