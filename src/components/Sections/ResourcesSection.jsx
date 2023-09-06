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
import { PageTitle } from "../../components";
const ResourcesSection = () => {
  const location = useLocation();
  const { updateAlertBoxData } = useAlertBoxContext();
  const { chapterID } = useParams();
  const [isDeleteResourceQueryEnabled, setIsDeleteResourceQueryEnabled] =
    useState(false);
  const [resourceToDelete, setResourceToDelete] = useState("");
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

  useQuery(
    ["deletedResource"],
    () => deleteResource({ resourceID: resourceToDelete }),
    {
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
    }
  );
  return (
    <div className="relative h-full w-full">
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
                  <DocumentTextIcon className="icon-styling text-slate-800" />
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
                  className={` cta-btn group z-10 ${
                    roles?.includes("EM-201") && "hidden"
                  }`}
                  onClick={() => {
                    console.log({ resourceID: resource?._id });
                    setResourceToDelete(resource?._id);
                    setIsDeleteResourceQueryEnabled(true);
                  }}
                >
                  <TrashIcon className="icon-styling  h-3 laptop:h-4 text-white" />
                </button>
              </div>
            );
          })}
      </div>
      {resourcesQuery.status === "success" &&
        resourcesQuery?.data?.chapterResources?.length === 0 && (
          <div className="flex-row-centered w-full h-full ">
            <p className=" p-4 rounded-lg bg-yellow-400 bg-opacity-30 text-slate-800">
              No resources present at the moment
            </p>
          </div>
        )}
    </div>
  );
};

export default ResourcesSection;
