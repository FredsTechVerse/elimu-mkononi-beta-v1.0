import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormNavigation, SubmitButton } from "../../components";
import { fetchUsersData } from "../../controllers/fetchData";
import { createUnit } from "../../controllers/postData";
import { handleError } from "../../controllers/handleErrors";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";

const UnitForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();

  const tutorsQuery = useQuery({
    queryKey: ["tutors"],
    queryFn: () => fetchUsersData("EM-202"),
  });

  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: (data) => {
      queryClient.setQueryData(["units", data._id], data);
      queryClient.invalidateQueries(["units"], { exact: true });
      updateAlertBoxData({
        response: "Unit saved successfully",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (isFormValid) {
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
  const { courseID } = useParams();
  const [tutor, setTutor] = useState();
  const [unitCode, setUnitCode] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");

  const isFormValid = () => {
    if (
      tutor !== null &&
      unitCode !== null &&
      unitName !== null &&
      unitDescription !== null
    ) {
      return true;
    }
    updateAlertBoxData({
      response: "Some input fields are empty",
      isResponse: true,
      status: "success",
      timeout: 3000,
    });
    return false;
  };
  const saveUnit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
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
      <div className="form-wrap h-[500px]">
        <FormNavigation text="unit form" />
        {/* PROPOSED HEADER. */}
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={saveUnit}
        >
          {/* DROPDOWN */}
          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Select Tutor
            </label>

            <select
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
              className="input-styling  mb-5"
            >
              <option selected className="text-grey">
                Choose a tutor
              </option>
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
          </div>
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="unitCode" className="w-full ">
              Unit Details
            </label>
            <input
              className="input-styling"
              id="unitCode"
              type="text"
              placeholder="Unit Code"
              value={unitCode}
              onChange={(e) => {
                setUnitCode(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              id="unitName"
              type="Text"
              placeholder="Unit Name"
              value={unitName}
              onChange={(e) => {
                setUnitName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="input-wrap">
            <label htmlFor="description" className="w-full">
              Unit Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="What is the unit about?"
              value={unitDescription}
              onChange={(e) => {
                setUnitDescription(e.target.value);
              }}
              required
            ></textarea>
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
