import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchChapterData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
const ResourcesSection = () => {
  const location = useLocation();
  const background = location;
  const { chapterID } = useParams();
  const navigate = useNavigate();
  const roles = localStorage.getItem("roles");
  const queryClient = useQueryClient();
  const resourcesQuery = useQuery(
    ["courses"],
    () => fetchChapterData({ chapterID }),
    {
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["courses"]);
        }
      },
    }
  );
  return (
    <div>
      <button
        className={`${
          roles?.includes("EM-203")
            ? "bg-slate-700 hover:bg-slate-900 w-max px-3 flex-row-centered rounded-full gap-2 h-8 text-slate-100 group"
            : "hidden"
        }`}
        onClick={() => {
          navigate("/new-resource", {
            state: {
              background: background,
              chapterID: chapterID,
            },
          });
        }}
      >
        <span>Add resource</span>
      </button>
      <div>
        {resourcesQuery.status === "success" &&
        resourcesQuery?.data?.chapterResources?.length > 0 ? (
          resourcesQuery?.data?.chapterResources.map((resource) => {
            return (
              <div
                onClick={() => {
                  navigate("view-resource/${resourceUrl}");
                }}
              >
                <span>
                  <DocumentTextIcon />
                </span>
                {resource.resourceName}
              </div>
            );
          })
        ) : (
          <p> No resources present at the moment</p>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;
