import { useEffect } from "react";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const AlertBox = () => {
  const { alertBoxData, setAlertBoxData } = useAlertBoxContext();
  console.log(alertBoxData);
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
          alertBoxData?.color === "success"
            ? " bg-green-300 border-green-600 text-green-900"
            : " bg-red-300 border-red-600 text-red-900"
        } absolute top-2 right-5 text-center p-4 border-l-4 rounded-lg debug`}
      >
        {alertBoxData?.response}
      </p>
    );
  } else {
    return null;
  }
};

export default AlertBox;
