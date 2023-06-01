import React from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
const CTAUnitButtonAdmin = ({ contact, _id }) => {
  let navigate = useNavigate();
  // My work in the front-end is simply to make the axios request to the backend ili ifanye haki
  const deleteTenant = async (_id) => {
    try {
      await axios.delete("/rooms/deleteTenant", { _id });
      //   After deleting, it should trigger a rerender.
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
    <div className="flex items-center justify-center w-full rounded-l-3xl rounded-r-3xl  border-none">
      <button
        className="flex items-center justify-center w-full bg-primary  border-none text-secondary py-1 px-2"
        onClick={() => {
          navigate(`/TenantsInformation/${_id}`);
        }}
      >
        <span>
          <AiFillEye />
        </span>
      </button>
      <button
        className="flex items-center justify-center w-full rounded-r-3xl border-none bg-rose-600 text-secondary py-1 px-2"
        onClick={() => {
          deleteTenant(_id);
        }}
      >
        <span>
          <RiDeleteBin5Line />
        </span>
      </button>
    </div>
  );
};

export default CTAUnitButtonAdmin;
