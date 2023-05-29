import React from "react";
import { Link } from "react-router-dom";
const ChapterCard = ({ number, heading, summary }) => {
  return (
    <Link to="/unit">
      <article className="hover:cursor-pointer chapter w-full bg-white h-[200px] flex flex-col gap-2  px-2 pt-3 rounded-md shadow-lg shadow-slate-400">
        <section className="flex items-center justify-start gap-3 ">
          <div className="w-20  rounded-r-3xl h-12 bg-primary  flex-row-centered text-white ">
            <span className="font-extraLight">{number}.</span>
          </div>
          <h1 className="uppercase text-xl font-extrabold">{heading}</h1>
        </section>
        <section className=" w-full h-full">
          <p className="text-dark text-lg w-full h-full px-4 mt-3">{summary}</p>
        </section>
      </article>
    </Link>
  );
};

export default ChapterCard;
