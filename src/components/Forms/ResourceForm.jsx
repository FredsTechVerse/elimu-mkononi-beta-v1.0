import React, { useState, useEffect, useRef } from "react";
import { ResourceFormSyntax } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { createResource, handleError } from "../../controllers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const ResourceForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();
  const location = useLocation();
  const { chapterID, background } = location?.state;
  const [resourceUrl, setResourceUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resourceName: "",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveResource)(e);
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

  const createResourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["resources", chapterID], { exact: true });
      updateAlertBoxData({
        response: "Resource has been saved",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryMutation(error.config.data);
      }
    },
  });

  const retryMutation = (formData) => {
    createResourceMutation.mutate({
      resourceName: formData.resourceName,
      resourceUrl: formData.resourceUrl,
      chapterID: formData.chapterID,
    });
  };

  const saveResource = async (data) => {
    const { resourceName } = data;
    if (resourceUrl && chapterID) {
      createResourceMutation.mutate({
        resourceName: resourceName,
        resourceUrl: resourceUrl,
        chapterID: chapterID,
      });
      return;
    }
    updateAlertBoxData({
      response: "Chapter ID has not been specified.",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  const updateFileName = (resourceUrl) => {
    setResourceUrl(resourceUrl);
  };

  return (
    <ResourceFormSyntax
      createResourceMutation={createResourceMutation}
      handleSubmit={handleSubmit}
      saveResource={saveResource}
      resourceUrl={resourceUrl}
      chapterID={chapterID}
      register={register}
      errors={errors}
      updateFileName={updateFileName}
    />
  );
};

export default ResourceForm;
