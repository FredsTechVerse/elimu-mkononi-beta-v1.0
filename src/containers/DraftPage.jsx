import React from "react";
import { TestBox } from "../components";
const DraftPage = () => {
  return (
    <div className="p-2 grid phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2 w-full h-full">
      <div className="flex flex-col gap-2">
        <TestBox />
        <TestBox />
      </div>
      <div className="flex flex-col gap-2 pt-20">
        <TestBox />
        <TestBox />
      </div>
      <div className="flex flex-col-centered h-full gap-2">
        <div className="flex flex-col gap-5">
          <h1 className="text-red-600">Our Services</h1>
          <h1 className="text-4xl">Ultimate experience</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
            corrupti!
          </p>
          <div className="w-48 h-12 rounded-full bg-red-600 text-lg text-bold capitalize text-white flex-col-centered">
            Read More
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftPage;
