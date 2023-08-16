import React from "react";
import { deleteUser } from "../../controllers";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

const CTAButton = ({ contact = null, userID, role }) => {
  const location = useLocation();
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
          <EyeIcon className="icon-styling h-4 laptop:h-5 text-slate-700" />
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex-row-centered gap-2 ">
        <button
          className="cta-btn"
          onClick={() => {
            messageTenant(contact);
          }}
        >
          <EnvelopeIcon className="icon-styling h-4 laptop:h-5  text-white " />
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            // console.log({ userID, role });
            navigate("/new-user", {
              state: { userID, role, background: location },
            });
          }}
        >
          <EyeIcon className="icon-styling h-4 laptop:h-5 text-white" />
        </button>
        <button
          className="cta-btn"
          onClick={() => {
            console.log({ userID, role });
            deleteUser({ userID });
          }}
        >
          <TrashIcon className="icon-styling h-4 laptop:h-5 text-white" />
        </button>
      </div>
    );
  }
};

export default CTAButton;
