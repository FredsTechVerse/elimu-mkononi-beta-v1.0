import React from "react";
import { Tooltip } from "../../components";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

const CTAButton = ({ contact = null, userID }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  let navigate = useNavigate();

  if (roles?.includes("EM-202")) {
    return (
      <div className="flex items-center justify-evenly w-full px-4  border-none">
        <button
          className="cta-btn "
          onClick={() => {
            navigate(`/tutor/unit/${userID}`);
          }}
        >
          <EyeIcon className="icon-styling h-5 text-slate-700" />
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex-row-centered gap-5 ">
        <button
          className="cta-btn"
          onClick={() => {
            messageTenant(contact);
          }}
        >
          <EnvelopeIcon className="icon-styling h-4  text-white " />
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            navigate("/new-user", { state: { userID, readOnly: true } });
          }}
        >
          <EyeIcon className="icon-styling h-4 text-white" />
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            deleteUser(userID);
          }}
        >
          <TrashIcon className="icon-styling h-4 text-white" />
        </button>
      </div>
    );
  }
};

export default CTAButton;
