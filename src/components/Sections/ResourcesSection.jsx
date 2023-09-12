import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import {
  fetchChapterData,
  handleError,
  deleteResource,
} from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TrashIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { FancyMessage, PageTitle } from "../../components";
const ResourcesSection = () => {
  const location = useLocation();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { unitID, chapterID } = useParams();
  console.log({ unitID, chapterID });
  const [isDeleteResourceQueryEnabled, setIsDeleteResourceQueryEnabled] =
    useState(false);
  const [resourceToDelete, setResourceToDelete] = useState({});
  const navigate = useNavigate();
  const roles = localStorage.getItem("roles");
  const queryClient = useQueryClient();
  console.log(chapterID);
  const resourcesQuery = useQuery(
    ["resources", chapterID],
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

  useQuery(["deletedResource"], () => deleteResource(resourceToDelete), {
    enabled: isDeleteResourceQueryEnabled,
    staleTime: 0,
    onSuccess: () => {
      updateAlertBoxData({
        response: "Deleted resource successfully",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
      setIsDeleteResourceQueryEnabled(false);
      queryClient.invalidateQueries(["resources", chapterID], {
        exact: true,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["deletedResource"]);
      }
    },
  });
  return (
    <div className="relative w-full">
      <button
        className={`${
          roles?.includes("EM-203")
            ? "absolute capitalize right-2 top-2 bg-slate-600 hover:bg-slate-900 w-max px-3 flex-row-centered gap-2 h-8  text-slate-100 group z-10 rounded-lg"
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
          resourcesQuery?.data?.chapterResources?.length > 0 &&
          resourcesQuery?.data?.chapterResources.map((resource, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between w-full bg-slate-300 bg-opacity-60 hover:bg-opacity-90 h-12 rounded-lg px-2 "
              >
                <span
                  onClick={() => {
                    navigate(`/view-resource/${resource.resourceUrl}`, {
                      state: { background: location },
                    });
                  }}
                >
                  <DocumentTextIcon className="icon-styling h-5 text-slate-800" />
                </span>
                <span
                  className="text-slate-800  w-full h-full flex-row-centered"
                  onClick={() => {
                    navigate(`/view-resource/${resource.resourceUrl}`, {
                      state: { background: location },
                    });
                  }}
                >
                  {resource.resourceName}
                </span>
                <button
                  className={` group z-10 ${
                    roles?.includes("EM-201") && "hidden"
                  }`}
                  onClick={() => {
                    setResourceToDelete({
                      resourceID: resource?._id,
                      resourceUrl: resource?.resourceUrl,
                    });
                    setIsDeleteResourceQueryEnabled(true);
                  }}
                >
                  <TrashIcon className="icon-styling  h-3 laptop:h-4 text-slate-700" />
                </button>
              </div>
            );
          })}
      </div>
      {resourcesQuery.status === "success" &&
        resourcesQuery?.data?.chapterResources?.length === 0 && (
          <FancyMessage message="No resources present at the moment" />
        )}
    </div>
  );
};

export default ResourcesSection;
