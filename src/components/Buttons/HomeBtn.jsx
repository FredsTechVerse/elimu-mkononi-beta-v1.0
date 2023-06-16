import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const HomeBtn = () => {
  return (
    <Link to="/">
      <div className="w-8 h-8 border-2 border-primary rounded-full text-md flex-row-centered hover:bg-primary cursor-pointer hover:text-white ">
        <AiFillHome />
      </div>
    </Link>
  );
};

export default HomeBtn;
