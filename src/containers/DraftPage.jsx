import React from "react";
import { AlertBox } from "../components";
import { useAlertBoxContext } from "../context/AlertBoxContext";
const DraftPage = () => {
  const { alertBoxData, updateAlertBoxData } = useAlertBoxContext();

  return (
    <div className=" w-full h-full flex-col-centered justify-start">
      <AlertBox alertBoxData={alertBoxData} />

      <button
        onClick={() =>
          updateAlertBoxData({
            response: "Its indeed a new dawning mehn?",
            isResponse: true,
            status: "success",
            timeout: 4500,
          })
        }
        className="button"
      >
        Button
      </button>
    </div>
  );
};

export default DraftPage;
