import React from "react";
import { SpinnerIcon } from "../../components";

const SubmitButton = ({
  text,
  type,
  disabled = false,
  isSubmitting,
  isError = false,
}) => {
  return (
    <button
      className={`text-lg capitalize w-48 m-3 h-9 rounded-full text-white text-center ${
        disabled ? "bg-blue-400" : " bg-primary  hover:bg-purple-600"
      }`}
      type={type}
      disabled={disabled}
    >
      <p className="w-full h-full flex justify-between px-2">
        <span>{text}</span>
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
