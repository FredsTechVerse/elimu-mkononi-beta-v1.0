import React from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

const CTAButton = ({ contact = null, unitID, fetchUsersData = null }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));

  let navigate = useNavigate();
  const deleteUser = async (_id) => {
    try {
      await axios.delete("/auth/student", {
        headers: {},
        data: { _id },
      });
      fetchUsersData();
      console.log("Tenant successfully deleted and put under archives.");
    } catch (error) {
      console.log(
        `${error.message} encountered when attempting to delete tenant.`
      );
    }
  };
  const messageTenant = (contact) => {
    console.log("Messaging Client");
  };
  if (roles?.includes("EM-202")) {
    return (
      <div className="flex items-center justify-evenly w-full px-4  border-none">
        <button
          className="cta-btn group hover:border-primary"
          onClick={() => {
            navigate(`/tutor/unit/${unitID}`);
          }}
        >
          <span className="text-slate-600 group-hover:text-primary text-2xl ">
            <EyeIcon className="icon-styling text-slate-700" />
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-evenly w-48  border-none">
        <button
          className="cta-btn group hover:border-green-500"
          onClick={() => {
            messageTenant(contact);
          }}
        >
          <span className="text-slate-600 group-hover:text-green-500 text-xl">
            <EnvelopeIcon className="icon-styling" />
          </span>
        </button>
        <button
          className="cta-btn group hover:border-primary"
          onClick={() => {
            navigate(`/TenantsInformation/${unitID}`);
          }}
        >
          <span className="text-slate-600 group-hover:text-primary text-2xl ">
            <EyeIcon className="icon-styling" />
          </span>
        </button>
        <button
          className="cta-btn group hover:border-red-600"
          onClick={() => {
            deleteUser(unitID);
          }}
        >
          <span className="text-slate-600 group-hover:text-red-600 text-2xl">
            <TrashIcon className="icon-styling" />
          </span>
        </button>
      </div>
    );
  }
};

export default CTAButton;
