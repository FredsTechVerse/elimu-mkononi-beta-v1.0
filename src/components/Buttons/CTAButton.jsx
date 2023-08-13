import React from "react";
import axios from "../../axios";
import { Tooltip } from "../../components";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

const CTAButton = ({ contact = null, userID, fetchUsersData = null }) => {
  // console.log({ userID });
  const roles = JSON.parse(localStorage.getItem("roles"));

  let navigate = useNavigate();
  const deleteUser = async (userID) => {
    try {
      console.log(`Student ID passed ${JSON.stringify(userID)}`);
      await axios.delete(`/auth/student/${userID}`);
      fetchUsersData();
    } catch (error) {}
  };
  const messageTenant = (contact) => {};
  if (roles?.includes("EM-202")) {
    return (
      <div className="flex items-center justify-evenly w-full px-4  border-none">
        <button
          className="cta-btn group hover:border-primary"
          onClick={() => {
            navigate(`/tutor/unit/${userID}`);
          }}
        >
          <span className="text-slate-600 group-hover:text-primary text-2xl ">
            <Tooltip tooltip="View">
              <EyeIcon className="icon-styling text-slate-700" />
            </Tooltip>
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center gap-5 debug  border-none">
        <button
          className="cta-btn group hover:border-green-500"
          onClick={() => {
            messageTenant(contact);
          }}
        >
          <span className="text-slate-600 group-hover:text-green-500 text-xl">
            <Tooltip tooltip="Message">
              <EnvelopeIcon className="icon-styling" />
            </Tooltip>
          </span>
        </button>
        <button
          className="cta-btn group hover:border-primary"
          onClick={() => {
            navigate("/new-user", { state: { userID, readOnly: true } });
          }}
        >
          <span className="text-slate-600 group-hover:text-primary text-2xl ">
            <Tooltip tooltip="View">
              <EyeIcon className="icon-styling" />
            </Tooltip>
          </span>
        </button>
        <button
          className="cta-btn group hover:border-red-600"
          onClick={() => {
            deleteUser(userID);
          }}
        >
          <span className="text-slate-600 group-hover:text-red-600 text-2xl">
            <Tooltip tooltip="Remove">
              <TrashIcon className="icon-styling" />
            </Tooltip>
          </span>
        </button>
      </div>
    );
  }
};

export default CTAButton;
