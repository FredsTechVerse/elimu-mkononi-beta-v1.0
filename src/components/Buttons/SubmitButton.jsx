import React from "react";
import { SpinnerIcon } from "../../components";

const SubmitButton = ({ text, type, disabled = false, isSubmitting }) => {
  return (
    <button
      className={`text-lg capitalize w-max px-3 my-3 h-9 rounded-full text-white text-center ${
        disabled ? "bg-blue-400" : " bg-primary  hover:bg-purple-600"
      }`}
      type={type}
      disabled={disabled}
      onClick={() => console.log("Submit btn has been clicked")}
    >
      <p className="w-full h-full flex items-center justify-center gap-3 px-2">
        <span className="capitalize">{text}</span>
        {isSubmitting && (
          <span>
            <SpinnerIcon />
          </span>
        )}
      </p>
    </button>
  );
};

export default SubmitButton;
