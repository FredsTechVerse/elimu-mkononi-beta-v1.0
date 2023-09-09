import React from "react";

const FancyMessage = ({ message }) => {
  return (
    <div className="flex-row-centered w-full h-full px-2 py-2">
      <p className=" flex-col-centered text-center p-3 bg-rose-300 m-2 rounded-lg w-max ">
        {message}
      </p>
    </div>
  );
};

export default FancyMessage;
