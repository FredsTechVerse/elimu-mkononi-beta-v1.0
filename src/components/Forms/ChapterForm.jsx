import React, { useState, useEffect } from "react";
import { CustomNav, Button, Modal } from "../../components";
import axios from "../../axios";
import LoadingBtn from "./LoadingBtn";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
const ChapterForm = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  // A link will be used to redirect us to this particular point.
  const navigate = useNavigate();
  const { unitID } = useParams();
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [submit, setSubmit] = useState(false);

  //   A FUNCTION THAT CREATES OUR POST OBJECT
  async function createPostObject({
    chapterNumber,
    chapterName,
    chapterDescription,
  }) {
    // ALTERNATIVE A : FANCY WAY OF CREATING OUR NORMAL OBJECT
    //=========================================================
    const formData = new FormData();
    formData.append("unitID", unitID);
    formData.append("chapterNumber", `${unitID}-${chapterNumber}`);
    formData.append("chapterName", chapterName);
    formData.append("chapterDescription", chapterDescription);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      setSubmit(true);
      const response = await axios.post(
        "/chapter/new-chapter",
        formData,
        config
      );
      console.log(JSON.stringify(response));

      return response;
    } catch (err) {
      setSubmit(false);
      let { data } = err.response;
      console.log(JSON.stringify(data));
      // Display the error as you will
      return err;
    }
  }

  const fileUploadHandler = async (e) => {
    e.preventDefault();

    // Create our post object.
    const result = await createPostObject({
      chapterNumber,
      chapterName,
      chapterDescription,
    });
    const { status } = result;
    if (status == 201) {
      setSubmit(true);
      navigate(-1);
    }
  };

  return (
    <Modal>
      {" "}
      <div className="bg-slate-300  bg-opacity-50 flex flex-col justify-center items-center tablet:3/5 laptop:w-1/3 phone:w-full">
        <CustomNav text="Chapter Form" />
        <form className="form-styling">
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="cNumber" className="w-full ">
              Chapter Details
            </label>
            <input
              className="input-styling"
              id="cNumber"
              type="number"
              placeholder="Chapter Number"
              value={chapterNumber}
              onChange={(e) => {
                setChapterNumber(e.target.value);
              }}
              required
            ></input>
            <input
              className="input-styling"
              id="fName"
              type="Text"
              placeholder="Chapter Name"
              value={chapterName}
              onChange={(e) => {
                setChapterName(e.target.value);
              }}
              required
            ></input>

            <input
              className="input-styling"
              id="lName"
              type="Text"
              placeholder="Description"
              value={chapterDescription}
              onChange={(e) => {
                setChapterDescription(e.target.value);
              }}
              required
            ></input>
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap ">
            {!submit ? (
              <Button type="button" text="Save" onClick={fileUploadHandler} />
            ) : (
              <LoadingBtn action="Uploading" />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChapterForm;
