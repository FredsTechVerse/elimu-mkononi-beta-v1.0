import React from "react";
import { Link } from "react-router-dom";
const UnitsCard = ({ number, heading, summary, unitId }) => {
  return (
    <article className="hover:cursor-pointer chapter w-[280px] bg-white h-36 flex flex-col gap-2  pt-2 rounded-md shadow-lg shadow-slate-300 ">
      <section className="px-2 flex items-center justify-start gap-3 ">
        <div className="ml-4 w-10 h-10  rounded-full bg-primary  flex-row-centered text-white ">
          <span className="font-extraLight">{number}</span>
        </div>
        <h1 className="uppercase text-xl font-extrabold">{heading}</h1>
      </section>
      <section className="w-full h-full flex flex-col">
        <p className="text-dark text-md w-full h-full px-4 mt-3">{summary}</p>
        <Link to={`/unit/${unitId}`}>
          <div className="flex-row-centered gap-1 w-32 bg-primary  text-white h-8 rounded-bl-md rounded-tr-md">
            <p>Learn More</p>
            <span>{`>`}</span>
          </div>
        </Link>
      </section>
    </article>
  );
};

export default UnitsCard;
