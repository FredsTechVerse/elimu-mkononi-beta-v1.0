import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ChapterCard, PageTitle } from "../components";
import axios from "../axios";
const UnitOverview = () => {
  const { unitID } = useParams();
  const [unitData, setUnitData] = useState({});
  const [isFetchComplete, setIsFetchComplete] = useState(false);

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
    <div>
      <PageTitle text="list of chapters" />
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
        <div className="flex-col-centered text-center py-3 px-2 bg-slate-300 m-2 rounded-lg">
          Skeleton will be displayed here!
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
