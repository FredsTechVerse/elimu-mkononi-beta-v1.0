import { Outlet, useParams } from "react-router-dom";
import { ChapterCard, PageTitle, UnitSkeleton } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitData } from "../api/get";
const UnitOverview = () => {
  const { unitID } = useParams();

  const unitQuery = useQuery({
    queryKey: ["unitData", unitID],
    queryFn: () => fetchUnitData(unitID),
  });
  return (
    <div className="flex-col-centered justify-start min-h-screen">
      <div className=" relative pattern h-56 w-full flex-row-centered">
        <p className="text-white font-bold text-center phone:text-xl tablet:text-2xl laptop:text-4xl uppercase w-full h-full flex-row-centered backdrop-blur-md bg-black bg-opacity-10">
          {unitQuery?.data && unitQuery?.data?.unitCode}
        </p>
      </div>
      <PageTitle text="list of chapters" />
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
