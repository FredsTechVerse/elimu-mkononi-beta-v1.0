import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <p className=" text-red-800 max-w-72 tablet:max-w-[360px] rounded-full text-center text-sm ">
      {message}
    </p>
  );
};

export default ErrorMessage;
