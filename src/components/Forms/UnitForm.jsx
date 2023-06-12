import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { FormNavigation, Button, LoadingBtn } from "../../components";
import { postObject } from "../../modules/postUnitObject";
const UnitForm = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  // LOADS COURSES DATA WHEN COMPONENT LOADS.
  const fetchTutorsData = async () => {
    try {
      const { data } = await axios.get("/auth/all-tutors");
      setTutors(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchTutorsData();
    return () => (document.body.style.overflow = "unset");
  }, []);
  // DECLARATION OF VARIABLES
  const { courseID } = useParams();
  // const [course, setCourse] = useState(`${courses[0].courseTitle}`);
  const [tutor, setTutor] = useState();
  const [unitCode, setUnitCode] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [submit, setSubmit] = useState();

  // SUBMITS INFO.
  //==============
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    setSubmit(true);
    // Create our post object.
    const { status } = await postObject({
      course: courseID,
      tutor: tutor,
      unitCode,
      unitName,
      unitDescription,
    });

    {
      status == 201 && navigate(-1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="w-3/5">
        <FormNavigation text="unit form" />
        {/* PROPOSED HEADER. */}
        <form encType="multipart/form-data" className="form-styling">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            >
              <option selected className="text-grey">
                Choose a tutor
              </option>
              {tutors &&
                tutors.map((tutor, index) => {
                  const { _id: tutorId, firstName, surname } = tutor;
                  return (
                    <option key={`tutor-${index}`} value={tutorId}>
                      {`${firstName} ${surname}`}
                    </option>
                  );
                })}
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
              className="input-styling"
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
            {!submit ? (
              <Button type="button" text="Save" onClick={fileUploadHandler} />
            ) : (
              <LoadingBtn action="Uploading" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitForm;
