import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchChapterData, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { PageTitle } from "../../components";
const ResourcesSection = () => {
  const location = useLocation();
  const { chapterID } = useParams();
  const navigate = useNavigate();
  const roles = localStorage.getItem("roles");
  const queryClient = useQueryClient();
  const resourcesQuery = useQuery(
    ["resources", chapterID],
    () => fetchChapterData({ chapterID }),
    {
      onSuccess: (data) => {
        console.log({ chapterData: data });
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["courses"]);
        }
      },
    }
  );
  return (
    <div className="relative">
      <button
        className={`${
          roles?.includes("EM-203")
            ? "absolute capitalize right-2 top-2 bg-slate-600 hover:bg-slate-900 w-max px-3 flex-row-centered rounded-lg gap-2 h-10 text-slate-100 group z-10"
            : "hidden"
        }`}
        onClick={() => {
          navigate("/new-resource", {
            state: {
              background: location,
              chapterID: chapterID,
            },
          });
        }}
      >
        <span>Add resource</span>
      </button>

      <div className="relative flex-row-centered h-12">
        <PageTitle title="list of resources" />
      </div>
      <div className="grid-sm">
        {resourcesQuery.status === "success" &&
        resourcesQuery?.data?.chapterResources?.length > 0 ? (
          resourcesQuery?.data?.chapterResources.map((resource, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate(`/view-resource/${resource.resourceUrl}`, {
                    state: { background: location },
                  });
                }}
                className="flex items-center justify-start w-full bg-slate-300 bg-opacity-60 hover:bg-opacity-90 h-12 rounded-lg px-1 gap-3"
              >
                <span>
                  <DocumentTextIcon className="icon-styling text-slate-800" />
                </span>
                <span className="text-slate-800">{resource.resourceName}</span>
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
