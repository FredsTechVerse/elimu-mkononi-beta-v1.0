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
      <div
        className={`${
          alertBoxData?.status === "success"
            ? "border-green-600 bg-green-300"
            : "border-red-600  bg-red-300"
        } text-slate-700 border-0 border-l-8 fixed top-2 tablet:right-3 rounded-md z-50 p-1 w-full tablet:w-80 flex flex-col`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="absolute top-1 right-1 ml-auto w-4 h-4 text-slate-600 hover:text-slate-900"
          onClick={() => {
            setAlertBoxData((prevData) => ({
              ...prevData,
              isResponse: false,
            }));
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p className="flex-row-centered gap-3">
          <span>
            {alertBoxData?.status === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </span>
          <span className="px-2 text-sm tablet:text-md">
            {alertBoxData?.response}
          </span>
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default AlertBox;
