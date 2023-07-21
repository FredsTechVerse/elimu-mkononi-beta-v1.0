import React from "react";
import { BackBtn, MenuBtn } from "../components";

const UnitOverview = ({ openSideBar, sideBarOpen }) => {
  return (
    <div className="flex-col-centered justify-start w-full h-full pt-1">
      <div className="relative pattern h-42 w-full phone:rounded-[16px] tablet:rounded-b-[16px] ">
        <div className="flex flex-col items-center justify-center w-full h-full  backdrop-blur-md bg-black bg-opacity-20 phone:rounded-[16px] laptop:rounded-b-[16px]">
          <div className={`absolute top-2 left-2  flex gap-1`}>
            <BackBtn />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <MenuBtn openSideBar={openSideBar} sideBarOpen={sideBarOpen} />
          </div>
          <p className="text-white my-14  font-bold  phone:text-xl tablet:text-2xl laptop:text-4xl uppercase">
            Course Outline
          </p>
        </div>
      </div>

      <ul className="list-decimal w-full  px-10 py-3 phone:text-sm laptop:text-lg pt-5">
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

      <div className="w-full flex-row-centered ">
        <button
          onClick={openSideBar}
          className="h-12 w-72 text-white bg-primary hover:bg-blue-900 rounded-md m-3"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default UnitOverview;
