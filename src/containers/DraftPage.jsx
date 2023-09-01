import React from "react";
import { TanstackTable } from "../components";

const DraftPage = () => {
  return (
    <div className=" w-full">
      <TanstackTable />

      <p className="test">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
        obcaecati.
        <a
          href="http://localhost:3000"
          style={{
            backgroundColor: "blue",
            display: "block",
            color: "white",
            margin: "2px",
            height: "50px",
            width: "250px",
          }}
        >
          Go to home
        </a>
      </p>
    </div>
  );
};

export default DraftPage;
