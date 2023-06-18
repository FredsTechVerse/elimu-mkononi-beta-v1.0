import { useContext, createContext, useState } from "react";
// CREATE CONTEXT
const AlertBoxContext = createContext();

// EXPOSING CONTEXT
export const useAlertBoxContext = () => {
  return useContext(AlertBoxContext);
};
// ASSING CONTEXT A VALUE
export const AlertBoxContextProvider = ({ children }) => {
  const [alertBoxData, setAlertBoxData] = useState({
    color: "success",
    isResponse: true,
    response: "Something",
    timeout: 0,
  });

  return (
    <AlertBoxContext.Provider value={{ alertBoxData, setAlertBoxData }}>
      {children}
    </AlertBoxContext.Provider>
  );
};
