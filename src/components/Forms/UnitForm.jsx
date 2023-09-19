import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UnitFormSyntax } from "../../components";
import {
  fetchUsersData,
  fetchUnitData,
  handleError,
  createUnit,
  updateUnit,
} from "../../controllers";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const UnitForm = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const location = useLocation();

  const { courseID, unitID, background } = location?.state;
  const isUnitQueryEnabled = unitID ? true : false;

  const [isEditEnabled, setIsEditEnabled] = useState(unitID ? false : true);

  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tutor: "",
      unitCode: "",
      unitName: "",
      unitDescription: "",
    },
  });

  const tutorsQuery = useQuery(["tutors"], () => fetchUsersData("EM-202"), {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["tutors"]);
      }
    },
  });

  // Fetch unit data
  const unitQuery = useQuery(
    ["unit", unitID],
    () => fetchUnitData({ unitID: unitID }),
    {
      enabled: isUnitQueryEnabled,
      staleTime: 1000 * 60 * 60,

      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["unit", unitID], { exact: true });
        }
      },
    }
  );
  useEffect(() => {
    if (unitQuery?.status === "success" && unitQuery?.data) {
      setValue("tutor", unitQuery?.data?.tutor[0]);
      setValue("unitCode", unitQuery?.data?.unitCode);
      setValue("unitName", unitQuery?.data?.unitName);
      setValue("unitDescription", unitQuery?.data?.unitDescription);
    }
  }, [unitID, unitQuery?.status]);

  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: (data) => {
      queryClient.setQueryData(["units", data._id], data);
      queryClient.invalidateQueries(["courseData"]);
      updateAlertBoxData({
        response: "Unit has been saved",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryCreatingUnitMutation(error.config.data);
      }
    },
  });

  const updateUnitMutation = useMutation({
    mutationFn: updateUnit,
    onSuccess: (data) => {
      queryClient.setQueryData(["units", data._id], data);
      queryClient.invalidateQueries(["courseData"]);
      updateAlertBoxData({
        response: "Unit has been updated",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(background);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUpdatingUnitMutation(error.config.data);
      }
    },
  });

  const retryCreatingUnitMutation = (formData) => {
    createUnitMutation.mutate({
      course: formData.courseID,
      tutor: formData.tutor,
      unitCode: formData.unitCode,
      unitName: formData.unitName,
      unitDescription: formData.unitDescription,
    });
  };

  const retryUpdatingUnitMutation = (formData) => {
    createUnitMutation.mutate({
      unitID: formData.unitID,
      course: formData.courseID,
      tutor: formData.tutor,
      unitCode: formData.unitCode,
      unitName: formData.unitName,
      unitDescription: formData.unitDescription,
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveUnit)(e);
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

  const saveUnit = async (data) => {
    const { tutor, unitCode, unitName, unitDescription } = data;
    if (!isUnitQueryEnabled) {
      if (courseID) {
        createUnitMutation.mutate({
          course: courseID,
          tutor: tutor,
          unitCode: unitCode,
          unitName: unitName,
          unitDescription: unitDescription,
        });
        return;
      }

      updateAlertBoxData({
        response: "courseID is not defined",
        isResponse: true,
        status: "failure",
        timeout: 4500,
      });
    } else {
      updateUnitMutation.mutate({
        unitID: unitID,
        tutor: tutor,
        unitCode: unitCode,
        unitName: unitName,
        unitDescription: unitDescription,
      });
      return;
    }
    updateAlertBoxData({
      response: "Something went wrong while updating unit",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <UnitFormSyntax
      courseID={courseID}
      handleSubmit={handleSubmit}
      saveUnit={saveUnit}
      isEditEnabled={isEditEnabled}
      isUnitQueryEnabled={isUnitQueryEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      unitQuery={unitQuery}
      createUnitMutation={createUnitMutation}
      updateUnitMutation={updateUnitMutation}
      tutorsQuery={tutorsQuery}
    />
  );
};

export default UnitForm;
