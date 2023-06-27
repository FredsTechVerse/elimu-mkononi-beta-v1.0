import React from "react";

const TeamCard = ({ tutor }) => {
  return (
    <div className="flex phone:flex-col laptop:flex-row justify-center items-center  phone:w-[310px] laptop:w-1/2 ">
      <img src={tutor.image} alt="" className="h-48 w-48 rounded-full " />

      <div className="w-auto shadow-md  pl-24 pr-4 py-4 h-auto flex flex-col phone:p-6">
        <div>
          <p className="text-primary text-bold mb-1 text-lg">{tutor.name}</p>
          <p className="text-bold mb-2 text-md">{tutor.course}</p>
          <p className="text-xs">{tutor.text}</p>
        </div>
        <div className="text-center pt-4 flex gap-3">Socials</div>
      </div>
    </div>
  );
};

export default TeamCard;
