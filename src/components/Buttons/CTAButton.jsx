import React, { useState } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, handleError } from "../../controllers";
import { EnvelopeIcon, TrashIcon } from "@heroicons/react/24/solid";

const CTAButton = ({ userID, role = null, contact = null, email = null }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [isDeleteQueryEnabled, setIsDeleteQueryEnabled] = useState(false);
  const navigate = useNavigate();

  useQuery(["deletedUser"], () => deleteUser({ userID, role }), {
    enabled: isDeleteQueryEnabled,
    staleTime: 0,

    onSuccess: () => {
      updateAlertBoxData({
        response: "Deleted user successfully",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
      setIsDeleteQueryEnabled(false);
      queryClient.invalidateQueries([role]);
      queryClient.invalidateQueries(["users"]);
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
          className="cta-btn group capitalize"
          onClick={() => {
            navigate(`/tutor/unit/${userID}`);
          }}
        >
          update
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex-row-centered gap-2 ">
        <button
          className="group"
          onClick={() => {
            navigate(
              {
                pathname: "/new-message",
                search: `?contact=${contact}&email=${email}`,
              },
              {
                state: { background: location },
              }
            );
          }}
        >
          <EnvelopeIcon className="icon-styling h-3 laptop:h-4 text-slate-700" />
        </button>
        <button
          className="cta-btn group capitalize text-center rounded-full w-20 text-sm text-white"
          onClick={() => {
            navigate(
              {
                pathname: "/new-user",
                search: `?role=${role}&userID=${userID}`,
              },
              {
                state: { background: location },
              }
            );
          }}
        >
          update
        </button>
        <button
          className=" group"
          onClick={() => {
            setIsDeleteQueryEnabled(true);
          }}
        >
          <TrashIcon className="icon-styling h-3 laptop:h-4 text-slate-700" />
        </button>
      </div>
    );
  }
};

export default CTAButton;
