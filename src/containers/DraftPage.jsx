import React from "react";
import { AlertBox } from "../components";
import { useAlertBoxContext } from "../context/AlertBoxContext";
const DraftPage = () => {
  const { alertBoxData, setAlertBoxData } = useAlertBoxContext();
  const updateAlertBoxData = () => {
    setAlertBoxData({
      response: "Its indeed a new dawn!",
      isResponse: true,
      color: "success",
      timeout: 4500,
    });
  };

  return (
    <div className=" w-full h-full flex-col-centered justify-start">
      <AlertBox alertBoxData={alertBoxData} />

      <button onClick={updateAlertBoxData} className="button">
        Button
      </button>
    </div>
  );
};

export default DraftPage;
