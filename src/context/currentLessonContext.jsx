import React, { useContext, createContext, useState, useEffect } from "react";

const CurrentLessonContext = createContext();

export const useCurrentLessonContext = () => {
  return useContext(CurrentLessonContext);
};

export const CurrentLessonContextProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState({});
  const updateCurrentLesson = (newLessonData) => {
    if (newLessonData !== null) {
      setCurrentLesson(newLessonData);
      return;
    }
    console.log("Current lesson data is null");
  };

  return (
    <CurrentLessonContext.Provider
      value={{ currentLesson, updateCurrentLesson }}
    >
      {children}
    </CurrentLessonContext.Provider>
  );
};
