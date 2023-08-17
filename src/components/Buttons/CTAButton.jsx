import React, { useState } from "react";
import { deleteUser, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CTAButton = ({ contact = null, userID, role = "EM-201" }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [isDeleteQueryEnabled, setIsDeleteQueryEnabled] = useState(false);
  const navigate = useNavigate();

  useQuery(["deletedUser"], () => deleteUser({ userID, role }), {
    enabled: isDeleteQueryEnabled,
    onSuccess: () => {
      queryClient.invalidateQueries([role]);
      setIsDeleteQueryEnabled(false);
      updateAlertBoxData({
        response: "Deleted user successfully",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["deletedUser"]);
      }
    },
  });

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
            setIsDeleteQueryEnabled(true);
          }}
        >
          <TrashIcon className="icon-styling h-4 laptop:h-5 text-white" />
        </button>
      </div>
    );
  }
};

export default CTAButton;
