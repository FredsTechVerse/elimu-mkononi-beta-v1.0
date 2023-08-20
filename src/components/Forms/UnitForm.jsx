import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
  ActionBtn,
} from "../../components";
import {
  fetchUsersData,
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

  const { courseID, unitID } = location?.state;
  const [isUnitQueryEnabled, setIsUnitQueryEnabled] = useState(
    unitID !== undefined ? true : false
  );
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
    retry: 1,
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
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["unit", unitID], { exact: true });
        }
      },
    }
  );

  // Update unit data values accordingly
  useEffect(() => {
    if (unitQuery?.status === "success" && unitQuery?.data) {
      setValue("tutor", unitQuery?.data?.tutor);
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
      navigate(-1);
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
      navigate(-1);
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
    if (courseID !== undefined) {
      if (!isUnitQueryEnabled) {
        console.log("Creating unit");
        createUnitMutation.mutate({
          course: courseID,
          tutor: tutor,
          unitCode: unitCode,
          unitName: unitName,
          unitDescription: unitDescription,
        });
      } else {
        updateUnitMutation.mutate({
          unitID: unitID,
          course: courseID,
          tutor: tutor,
          unitCode: unitCode,
          unitName: unitName,
          unitDescription: unitDescription,
        });
      }
    }
    updateAlertBoxData({
      response: "courseID| unitID has not been provided.",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <Modal>
      {" "}
      <div className="form-wrap ">
        <FormNavigation text="unit form" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveUnit)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Select Tutor
            </label>

            <select
              disabled={!isEditEnabled}
              className="input-styling  mb-5"
              name="--Choose a tutor--"
              {...register("tutor", {
                required: "This field is required ",
              })}
            >
              {tutorsQuery?.data ? (
                tutorsQuery?.data.map((tutor, index) => {
                  const { _id: tutorId, firstName, surname } = tutor;
                  return (
                    <option key={`tutor-${index}`} value={tutorId}>
                      {`${firstName} ${surname}`}
                    </option>
                  );
                })
              ) : (
                <option className="bg-rose-500 px-2 py-1 rounded-lg">
                  No tutor data found
                </option>
              )}
            </select>
            {errors.tutor && <ErrorMessage message={errors.tutor?.message} />}
          </div>
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="unitCode" className="w-full ">
              Unit Details
            </label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Unit Code"
              {...register("unitCode", {
                required: "This field is required ",
                maxLength: {
                  value: 15,
                  message: "Must not be greater than 10 characters",
                },
              })}
            />
            {errors.unitCode && (
              <ErrorMessage message={errors.unitCode?.message} />
            )}

            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Unit Name"
              {...register("unitName", {
                required: "This field is required ",
                maxLength: {
                  value: 30,
                  message: "Must not be greater than 20 characters",
                },
              })}
            />

            {errors.unitName && (
              <ErrorMessage message={errors.unitName?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="description" className="w-full">
              Unit Description
            </label>
            <textarea
              readOnly={!isEditEnabled}
              placeholder="What is the unit about?"
              maxLength={60}
              {...register("unitDescription", {
                required: "This field is required ",
                maxLength: {
                  value: 60,
                  message: "Must not be greater than 60 characters",
                },
              })}
            ></textarea>
            {errors.unitDescription && (
              <ErrorMessage message={errors.unitDescription?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isUnitQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isUnitQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={courseID ? false : true}
                  isSubmitting={createUnitMutation.isLoading}
                  text={
                    createUnitMutation.isLoading ? "Registering" : "Register"
                  }
                />
              ) : (
                <ActionBtn
                  type="button"
                  onClick={() => {
                    enableEdit();
                  }}
                  text="Edit"
                />
              )}
            </div>

            <div
              className={`${
                isEditEnabled && isUnitQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateUnitMutation.isLoading}
                text={updateUnitMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  unitQuery.refetch();
                }}
                text="cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UnitForm;
