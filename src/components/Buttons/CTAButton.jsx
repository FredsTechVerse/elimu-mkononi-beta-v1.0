import React from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
const CTAButton = ({ contact, _id, fetchUsersData: fetchUsersData }) => {
  console.log(`Users ID ${_id}`);
  let navigate = useNavigate();
  // My work in the front-end is simply to make the axios request to the backend ili ifanye haki
  const deleteUser = async (_id) => {
    try {
      await axios.delete("/auth/student", {
        headers: {},
        data: { _id },
      });
      //   After deleting, it should trigger a rerender.
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
  return (
    <div className="flex items-center justify-evenly w-48  border-none">
      <button
        className="cta-btn group hover:border-green-500"
        onClick={() => {
          messageTenant(contact);
        }}
      >
        <span className="text-slate-600 group-hover:text-green-500 text-xl">
          <BiMessageDetail />
        </span>
      </button>
      <button
        className="cta-btn group hover:border-primary"
        onClick={() => {
          navigate(`/TenantsInformation/${_id}`);
        }}
      >
        <span className="text-slate-600 group-hover:text-primary text-2xl ">
          <AiFillEye />
        </span>
      </button>
      <button
        className="cta-btn group hover:border-red-600"
        onClick={() => {
          deleteUser(_id);
        }}
      >
        <span className="text-slate-600 group-hover:text-red-600 text-2xl">
          <RiDeleteBin5Line />
        </span>
      </button>
    </div>
  );
};

export default CTAButton;
