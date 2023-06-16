import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChapterCard, UnitSkeleton, NavBgBtn } from "../components";
import axios from "../axios";
const UnitOverview = () => {
  const { unitID } = useParams();
  const [unitData, setUnitData] = useState({});
  const [isFetchComplete, setIsFetchComplete] = useState(false);

  const roles = localStorage.getItem("roles");
  useEffect(() => {
    fetchUnitData();
  }, [unitID]);
  const fetchUnitData = async () => {
    try {
      const { data, status } = await axios.get(`/unit/${unitID}`);
      setIsFetchComplete(true);
      if (status == 200 && data) {
        console.log(JSON.stringify(data));
        setUnitData(data);
      }
    } catch (error) {
      setIsFetchComplete(true);
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-start gap-2">
      <div className="w-full relative pattern h-48 flex-row-centered ">
        {JSON.stringify(unitData) !== "{}" && (
          <p className="text-white font-bold text-center phone:text-xl tablet:text-2xl laptop:text-4xl uppercase w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-10 flex-row-centered gap-4">
            <span>{unitData?.unitCode}</span>
            <span>{unitData?.unitName}</span>
          </p>
        )}
        {(roles?.includes("EM-202") || roles?.includes("EM-203")) && (
          <div className="absolute top-1 right-1 flex gap-1">
            <NavBgBtn
              to={`/tutor/new-chapter/${unitData?._id}`}
              text="Add Chapter"
            />
          </div>
        )}

        <div className="absolute h-2 bg-white w-full bottom-0 rounded-t-full"></div>
      </div>
      <h1 className="uppercase font-extrabold text-3xl text-slate-700 ml-3 mb-2 w-full text-center">
        What the unit entails
      </h1>
      <ul className="list-decimal w-full px-10 text-lg mb-5">
        <li>
          Elements of a measurement system: Accuracy, precision, sensitivity of
          instrument.
        </li>
        <li>
          Sources of error and Error analysis. Transducers: Resistive,
          capacitive, inductive, optical, thermal etc.
        </li>
        <li> Analogue instrument, Digital instruments.</li>
        <li>
          Instrument transformers. Alternating Current/ Direct Current (AC/DC)
          bridges. Cathode ray oscilloscope (CRO).
        </li>
        <li>
          Calibration of instruments. Measurements of voltage, current, charge,
          resistance, inductance, capacitance, phase angle, frequency, power and
          en- ergy.
        </li>
        <li>
          Generalized performance of instrumentation systems. Static
          characteristics.
        </li>
        <li>
          Meteorological standards, error analysis. Dynamic characteristics:
          Dynamic system models. Transducers for non- electrical quantities,
          application to measurement of primary variable: mechanical, thermal,
          acoustic.
        </li>
        <li>
          Remote sensing techniques. Signal conditioning. Microprocessor
          application in instrumentation. Noise and interference reduction.
          Chart recorder: X-Y plotters, digital data recording, digital dis-
          plays
        </li>
      </ul>
      <h1 className="uppercase font-extrabold text-3xl text-slate-700 ml-3 text-center w-full my-3">
        Chapter Breakdown
      </h1>
      {isFetchComplete && unitData && unitData.unitChapters.length > 0 ? (
        <div className="flex-col-centered">
          <div className="grid-sm">
            {unitData.unitChapters.map((chapter, index) => (
              <ChapterCard
                key={index}
                unitID={unitID}
                chapterID={chapter?._id}
                chapterNumber={`${index + 1}`}
                chapterName={chapter?.chapterName}
              />
            ))}
          </div>
        </div>
      ) : !isFetchComplete ? (
        <div className="grid-sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <UnitSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex-col-centered text-center py-3 px-2 bg-rose-300 m-2 rounded-lg">
          This unit has no content yet.Put button for tutor or admin to add
          content.
        </div>
      )}
    </div>
  );
};

export default UnitOverview;
