import React from "react";
import axios from "../../axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChatBubbleBottomCenterIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
const CTAUnitButtonAdmin = ({ contact, _id: unitID }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // My work in the front-end is simply to make the axios request to the backend ili ifanye haki
  const deleteTenant = async (_id) => {
    try {
      await axios.delete("/rooms/deleteTenant", { _id });
    } catch (error) {}
  };
  const messageTenant = (contact) => {};
  return (
    <div className="flex items-center justify-center w-full rounded-l-3xl rounded-r-3xl  border-none">
      <button
        className="flex items-center justify-center w-full bg-primary  border-none text-secondary py-1 px-2"
        onClick={() => {
          navigate(`/new-unit/${_id}`, {
            state: { background: location, courseID: courseID },
          });
        }}
      >
        <span>
          <PencilIcon className="icon-styling " />
        </span>
      </button>
      <button
        className="flex items-center justify-center w-full rounded-r-3xl border-none bg-rose-600 text-secondary py-1 px-2"
        onClick={() => {
          deleteTenant(_id);
        }}
      >
        <span>
          <TrashIcon className="icon-styling" />
        </span>
      </button>
    </div>
  );
};

export default CTAUnitButtonAdmin;
