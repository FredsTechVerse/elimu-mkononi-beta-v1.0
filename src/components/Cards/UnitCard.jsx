import React, { useState } from "react";
import { deleteUnit, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const UnitCard = ({
  unitNumber,
  unitName,
  unitDescription,
  unitID,
  courseID,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [isDeleteQueryEnabled, setIsDeleteQueryEnabled] = useState(false);

  useQuery(["deletedUnit"], () => deleteUnit({ unitID }), {
    enabled: isDeleteQueryEnabled,
    staleTime: 0,
    onSuccess: () => {
      updateAlertBoxData({
        response: "Deleted unit successfully",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
      setIsDeleteQueryEnabled(false);
      queryClient.invalidateQueries(["courseData", courseID], { exact: true });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["deletedUnit"]);
      }
    },
  });
  return (
    <article className="hover:cursor-pointer w-full  laptop:h-44  h-40 flex flex-col justify-between   pt-2 rounded-xl shadow-lg shadow-slate-400 ">
      <section className="px-2 flex items-center justify-start gap-3 h-[20%] ">
        <div className="ml-2 h-8 aspect-square  rounded-full bg-slate-600  flex-row-centered text-white ">
          <span className="font-extraLight">{unitNumber}</span>
        </div>
        <h1 className="uppercase text-lg font-extrabold">{unitName}</h1>
      </section>
      <section className={` w-full h-full flex-row-centered overflow-auto`}>
        <p className="text-dark text-md text-ellipsis  w-full h-full px-4 mt-3">
          {unitDescription}
        </p>
      </section>
      <section className="  flex gap-2 justify-end items-center h-[20%]">
        <button
          className={`${roles?.includes("EM-203") ? " group" : "hidden"}`}
          onClick={() => {
            setIsDeleteQueryEnabled(true);
          }}
        >
          <TrashIcon className="icon-styling h-4 text-slate-700" />
        </button>

        <button
          className={`${roles?.includes("EM-203") ? " group" : "hidden"}`}
          onClick={() => {
            navigate("/new-unit", {
              state: { unitID, background: location },
            });
          }}
        >
          <PencilIcon className="icon-styling h-4  text-slate-700" />
        </button>

        <Link
          to={`/course/${courseID}/${unitID}/content`}
          state={{ previousPage: location }}
          className="flex-row-centered gap-1 px-2 laptop:w-40 bg-slate-600 hover:bg-slate-800  text-slate-100 h-8 rounded-br-md rounded-tl-md "
        >
          <p>Learn More</p>
        </Link>
      </section>
    </article>
  );
};

export default UnitCard;
