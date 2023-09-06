import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex-row-centered w-full">
      <p className=" flex-col-centered text-center p-3 bg-rose-300 m-2 rounded-lg w-max ">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
