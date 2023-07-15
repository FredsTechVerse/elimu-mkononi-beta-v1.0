import React from "react";
import SpinnerImage from "../../assets/spinner-icon.svg";
const SpinnerIcon = () => {
  return (
    <img
      alt="spinner-icon"
      src={SpinnerImage}
      className="rounded-full  h-6 aspect-square animate-spin"
    />
  );
};

export default SpinnerIcon;
