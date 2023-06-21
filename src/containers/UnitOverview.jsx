import { useParams } from "react-router-dom";
import { ChapterCard, UnitSkeleton, NavBgBtn } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitData } from "../controllers/fetchData";
const UnitOverview = () => {
  const { unitID } = useParams();
  const roles = JSON.parse(localStorage.getItem("roles"));

  const unitQuery = useQuery({
    queryKey: ["unitData", unitID],
    queryFn: () => fetchUnitData(unitID),
  });

  return (
    <div className="flex-col-centered justify-start bg-slate-100 ">
      <div className="relative pattern h-60 w-full">
        <div className="flex flex-col items-start justify-center w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-20">
          <p className="mx-auto text-white  font-bold  phone:text-xl tablet:text-2xl laptop:text-4xl uppercase">
            <span>{unitQuery?.data?.unitCode}</span> -
            <span>{unitQuery?.data?.unitName}</span>
          </p>
        </div>
        {(roles?.includes("EM-202") || roles?.includes("EM-203")) && (
          <div className="absolute top-1 right-1 flex gap-1">
            <NavBgBtn
              to={`/tutor/new-chapter/${unitQuery?.data?._id}`}
              text="Add Chapter"
            />
          </div>
        )}
        <div className="absolute h-7 bg-slate-100 w-full bottom-0 rounded-t-full"></div>
      </div>
      <h1 className="uppercase font-extrabold text-lg text-slate-700 pl-4 mb-2 w-full text-left ">
        What the unit entails
      </h1>
      <ul className="list-decimal w-full px-10 text-md mb-5">
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
      <h1 className="uppercase font-extrabold text-lg text-slate-700 pl-4 mb-2 w-full text-left">
        Chapter Breakdown
      </h1>
      {unitQuery.status === "loading" ? (
        <div className="grid-sm w-full h-full overflow-hidden">
          <UnitSkeleton />
          <UnitSkeleton />
          <UnitSkeleton />
        </div>
      ) : unitQuery.status === "error" ? (
        <p className="bg-red-300 rounded-lg p-4">{unitQuery.error.message}</p>
      ) : (
        <div className="flex-col-centered">
          {unitQuery?.data?.unitChapters.length > 0 ? (
            <div className="grid-sm">
              {unitQuery?.data?.unitChapters.map((chapter, index) => (
                <ChapterCard
                  key={index}
                  unitID={unitID}
                  chapterID={chapter?._id}
                  chapterNumber={`${index + 1}`}
                  chapterName={chapter?.chapterName}
                />
              ))}
            </div>
          ) : (
            <p className="bg-blue-300 rounded-lg p-4 text-center">
              The unit has not yet been populated
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitOverview;
