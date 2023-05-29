import React from "react";

const AlertBox = ({ responseTracker, statusTracker, response }) => {
  return (
    <div>
      {responseTracker ? (
        <p
          className={`${
            statusTracker
              ? " bg-green-300 border-green-600"
              : " bg-red-300 border-red-600"
          } relative top-2 right-5 text-stone-600 text-center p-4 border-l-4`}
        >
          {response}
         
        </p>
      ) : (
       <div className="hidden">

       </div>
      )}
    </div>
  );
};

export default AlertBox;
