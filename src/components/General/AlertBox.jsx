import React, { useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const AlertBox = () => {
  const { alertBoxData, initializeAlertBox } = useAlertBoxContext();
  useEffect(() => {
    if (alertBoxData?.isResponse) {
      const timeoutId = setTimeout(() => {
        initializeAlertBox();
      }, alertBoxData.timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [alertBoxData]);
  if (alertBoxData?.isResponse === true) {
    return (
      <div className="fixed w-[90%] tablet:w-80 alertbox-centered">
        <div
          className={`${
            alertBoxData?.status === "success"
              ? "border-green-600 bg-green-300"
              : "border-red-600  bg-red-300"
          } text-slate-700 border-0 border-l-8  rounded-md  p-1 flex flex-col  `}
        >
          <span
            onClick={() => {
              initializeAlertBox();
            }}
          >
            <XMarkIcon className="absolute top-1 right-1 ml-auto w-4 h-4 text-slate-600 hover:text-slate-900" />
          </span>

          <p className="flex-row-centered gap-3">
            <span>
              {alertBoxData?.status === "success" ? (
                <CheckCircleIcon className="icon-styling w-12 h-12 text-green-700" />
              ) : (
                <XCircleIcon className="icon-styling w-12 h-12 text-red-700" />
              )}
            </span>
            <span className="px-2 text-sm tablet:text-md">
              {alertBoxData?.response}
            </span>
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AlertBox;
