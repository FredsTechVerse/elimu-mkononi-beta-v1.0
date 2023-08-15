import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormNavigation, SubmitButton, ErrorMessage } from "../../components";
import { fetchUsersData, handleError, createUnit } from "../../controllers";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";

const UnitForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();
  const location = useLocation();
  const tutorsQuery = useQuery(["tutors"], () => fetchUsersData("EM-202"), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["tutors"]);
      }
    },
  });

  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: (data) => {
      queryClient.setQueryData(["units", data._id], data);
      queryClient.invalidateQueries(["courseData"]);
      updateAlertBoxData({
        response: "Unit has been saved",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createUnitMutation.mutate({
          course: courseID,
          tutor: tutor,
          unitCode: unitCode,
          unitName: unitName,
          unitDescription: unitDescription,
        });
      }
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        saveUnit(e);
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

  // DECLARATION OF VARIABLES
  const { courseID } = location?.state;
  // const [tutor, setTutor] = useState();
  // const [unitCode, setUnitCode] = useState("");
  // const [unitName, setUnitName] = useState("");
  // const [unitDescription, setUnitDescription] = useState("");

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

  const saveUnit = async (data) => {
    const { tutor, unitCode, unitName, unitDescription } = data;
    if (courseID) {
      createUnitMutation.mutate({
        course: courseID,
        tutor: tutor,
        unitCode: unitCode,
        unitName: unitName,
        unitDescription: unitDescription,
      });
    }
  };

  return (
    <div className="modal-overlay ">
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
              className="input-styling  mb-5"
              {...register("tutor", {
                required: "This field is required ",
              })}
            >
              <option className="text-grey">--Choose a tutor--</option>
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
                <p className="bg-rose-500 px-2 py-1 rounded-lg">
                  No tutor data found
                </p>
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
              className="input-styling"
              placeholder="Unit Code"
              {...register("unitCode", {
                required: "This field is required ",
              })}
            />
            {errors.unitCode && (
              <ErrorMessage message={errors.unitCode?.message} />
            )}

            <input
              className="input-styling"
              placeholder="Unit Name"
              {...register("unitName", {
                required: "This field is required ",
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
              placeholder="What is the unit about?"
              {...register("unitDescription", {
                required: "This field is required ",
                maxLength: 50,
              })}
            ></textarea>
            {errors.unitDescription && (
              <ErrorMessage message={errors.unitDescription?.message} />
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              isSubmitting={createUnitMutation?.isLoading}
              text={
                createUnitMutation?.status === "loading" ? "Saving" : "Save"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitForm;
