import React, { useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { AiFillFilePdf } from "react-icons/ai";
import { NavBgBtn } from "..";
import axios from "../../axios";
const ResourcesSection = () => {
  const { lessonID, lessonResources } = useOutletContext();
  console.log(`List of lesson resources ID'S ${lessonResources}`);
  const [lessonData, setLessonData] = useState({});
  const fetchLesson = async (lessonID) => {
    try {
      const { data, status } = await axios.get("/lesson/lessonID", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        setLessonData(data);
      }
    } catch (error) {
      if (error.response.status === 403) {
        // handleLogout();
        console.log("You are forbidden from accessing the given resources.");
      } else {
        console.log(error.response.status);
      }
    }
  };

  const fetchResources = async (resourceID) => {
    try {
      const { data, status } = await axios.get(`/resources/${resourceID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        setResourcesData(data);
      }
    } catch (error) {
      if (error.response.status === 403) {
        // handleLogout();
        console.log("You are forbidden from accessing the given resources.");
      } else {
        console.log(error.response.status);
      }
    }
  };

  if (lessonResources?.length > 0) {
    return (
      <div className="w-full flex-row-centered uppercase text-black">
        {lessonData?.lessonResources.map((resource, resourceIndex) => {
          return (
            <li className="" key={resourceIndex}>
              <AiFillFilePdf /> {resource.resourceName}
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
        <p>
          There are no new resources. Kindly add a new resource by clicking the
          button below.
        </p>
        ;
        <NavBgBtn to="new-resource" text="New Resource" />
      </div>
    );
  }
};

export default ResourcesSection;
