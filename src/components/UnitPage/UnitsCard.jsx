import React from "react";
import { Link } from "react-router-dom";
const UnitsCard = ({ number, heading, summary, unitId }) => {
  return (
    <article className="hover:cursor-pointer chapter max-w-[350px] bg-white h-[180px] flex flex-col gap-2  pt-3 rounded-md shadow-lg shadow-slate-400 ">
      <section className=" pl-4 px-2 flex items-center justify-start gap-3 ">
        <div className="w-12 h-12  rounded-full bg-primary  flex-row-centered text-white ">
          <span className="font-extraLight">{number}</span>
        </div>
        <h1 className="uppercase text-xl font-extrabold">{heading}</h1>
      </section>
      <section className="w-full h-full flex flex-col">
        <p className="text-dark text-lg w-full h-full px-4 mt-3">{summary}</p>
        <Link to={`/unit/${unitId}`}>
          <div className="flex w-32 justify-between bg-primary  text-white py-2 px-2 rounded-bl-md rounded-tr-md">
            <p>Learn More</p>
            <span>{`>`}</span>
          </div>
        </Link>
      </section>
    </article>
  );
};

export default UnitsCard;
