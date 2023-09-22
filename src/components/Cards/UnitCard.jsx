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
    <article className="  hover:cursor-pointer w-full flex flex-col justify-between   pt-2 rounded-xl shadow-lg shadow-slate-400 ">
      <section className="px-2 flex items-center justify-start gap-3 h-[20%] ">
        <div className="ml-2 h-7 aspect-square  rounded-full bg-slate-600  flex-row-centered text-white ">
          <span className="font-extraLight">{unitNumber}</span>
        </div>
        <h1 className="uppercase text-[15px] laptop:text-md laptop:text-lg font-extrabold text-ellipsis overflow-hidden whitespace-nowrap ">
          {unitName}
        </h1>
      </section>
      <section className={` w-full h-24 flex-row-centered overflow-auto`}>
        <p className="text-dark text-[16px] text-ellipsis  w-full h-full px-4 py-2 ">
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
          className="flex-row-centered gap-1 px-2 laptop:w-40 bg-slate-600 hover:bg-slate-800  text-slate-100 h-[26px] rounded-br-md rounded-tl-md "
        >
          <p className="text-[15px]">Learn More</p>
        </Link>
      </section>
    </article>
  );
};

export default UnitCard;
