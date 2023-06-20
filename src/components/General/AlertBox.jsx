import { useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const AlertBox = () => {
  const { alertBoxData, setAlertBoxData } = useAlertBoxContext();
  useEffect(() => {
    if (alertBoxData?.isResponse) {
      const timeoutId = setTimeout(() => {
        setAlertBoxData((prevAlertBoxData) => ({
          ...prevAlertBoxData,
          isResponse: false,
        }));
      }, alertBoxData.timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [alertBoxData, setAlertBoxData]);
  if (alertBoxData?.isResponse === true) {
    return (
      <p
        className={`${
          alertBoxData?.status === "success"
            ? "border-green-900 bg-green-300"
            : "border-red-900  bg-red-400"
        } text-slate-700 border-0 border-l-8 absolute top-2 right-3 text-center p-4  rounded-md z-50 w-full tablet:w-72`}
      >
        {alertBoxData?.response}
      </p>
    );
  } else {
    return null;
  }
};

export default AlertBox;
