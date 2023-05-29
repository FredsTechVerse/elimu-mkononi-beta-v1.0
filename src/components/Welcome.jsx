import React from "react";

export const Welcome = () => {
  return (
    <div className=" bg-primary text-justify  p-20 flex flex-col justify-center  xl:h-full lg:h-scree md:h-h-auto phone:h-h-auto md:w-w-auto  phone:w-w-auto px-10 py-5">
      <h3 className="text-white">
        Welcome <br /> to our elearning Platform!
      </h3>
      <p className="text-light-grey">
        Register now to explore more exciting features
      </p>
    </div>
  );
};
