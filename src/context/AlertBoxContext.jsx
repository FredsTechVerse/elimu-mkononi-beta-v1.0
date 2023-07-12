import React, { useContext, createContext, useState } from "react";
const AlertBoxContext = createContext();

export const useAlertBoxContext = () => {
  return useContext(AlertBoxContext);
};
export const AlertBoxContextProvider = ({ children }) => {
  const [alertBoxData, setAlertBoxData] = useState({
    status: null,
    isResponse: false,
    response: null,
    timeout: null,
  });

  const updateAlertBoxData = ({ response, isResponse, status, timeout }) => {
    setAlertBoxData({
      response,
      isResponse,
      status,
      timeout,
    });
  };

  const initializeAlertBox = () => {
    setAlertBoxData({
      status: null,
      isResponse: false,
      response: null,
      timeout: null,
    });
  };

  return (
    <AlertBoxContext.Provider
      value={{ alertBoxData, updateAlertBoxData, initializeAlertBox }}
    >
      {children}
    </AlertBoxContext.Provider>
  );
};
