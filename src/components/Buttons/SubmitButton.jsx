import React from "react";

const SubmitButton = ({ text, type, onClick }) => {
  return (
    <button
      className="text-lg capitalize w-48 m-3 h-9 rounded-full bg-primary hover:bg-purple-600 text-white text-center"
      type={type}
      onClick={onClick}
    >
      <div className="w-full h-full flex-row-centered">{text}</div>
    </button>
  );
};

export default SubmitButton;
