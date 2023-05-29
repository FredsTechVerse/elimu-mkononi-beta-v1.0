import React from "react";

const Button = ({ text, to, onClick }) => {
  return (
    <a
      className="text-lg capitalize px-4 w-48 m-3 py-3 rounded-md bg-primary hover:bg-purple-600 text-white text-center"
      href={to}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default Button;
