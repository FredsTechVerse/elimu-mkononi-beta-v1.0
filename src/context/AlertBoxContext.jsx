import React, { useContext, createContext, useState } from "react";
// CREATE CONTEXT
const AlertBoxContext = createContext();

// EXPOSING CONTEXT
export const useAlertBoxContext = () => {
  return useContext(AlertBoxContext);
};
// ASSING CONTEXT A VALUE
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

  return (
    <AlertBoxContext.Provider
      value={{ alertBoxData, setAlertBoxData, updateAlertBoxData }}
    >
      {children}
    </AlertBoxContext.Provider>
  );
};
