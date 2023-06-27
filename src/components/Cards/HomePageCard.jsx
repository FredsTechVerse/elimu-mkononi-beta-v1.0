import React from "react";

const HomePageCard = ({ heading, text, src }) => {
  // heading = 'lorem ipsum'
  //  src = HomeImage;
  return (
    <article>
      <div className="w-[200px] rounded border-2 border-primary  shadow-xs shadow-primary  flex flex-col">
        <img className="w-full" src={src} alt="Course Card" />
        <div className="px-2 py-4 w-full">
          <div className="font-bold text-md  mb-2 capitalize">{heading}</div>
          <p className="text-gray-700 text-sm w-full truncate">{text}</p>
        </div>
      </div>
    </article>
  );
};

export default HomePageCard;
