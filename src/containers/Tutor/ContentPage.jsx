import React, { useEffect, useState } from "react";
import {
  Accordion,
  ContentSection,
  AccordionSkeleton,
  ContentSectionSkeleton,
} from "../../components";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUnitData } from "../../controllers/fetchData";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError } from "../../controllers/handleErrors";
const ContentPage = () => {
  const { unitID } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const unitDataQuery = useQuery(
    ["unitData", unitID],
    () => fetchUnitData(unitID),
    {
      retry: 1,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["unitData", unitID]);
        }
      },
    }
  );

  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  if (unitDataQuery.status === "loading") {
    return (
      <main className="flex relative laptop:grid laptop:grid-cols-4 w-full h-screen">
        <article
          className={` ${
            sideBarOpen ? "block" : "hidden"
          }   w-full h-full absolute laptop:relative laptop:block  laptop:col-span-1 `}
        >
          <AccordionSkeleton />
        </article>

        <article className="w-full laptop:col-span-3 h-full overflow-y-auto flex flex-col  ">
          <ContentSectionSkeleton />
        </article>
      </main>
    );
  }

  return (
    <main className="flex relative gap-1 laptop:grid laptop:grid-cols-4 w-full h-screen p-1">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }  phone:w-full tablet:w-80 laptop:w-full h-full absolute laptop:relative laptop:block `}
      >
        <Accordion
          unitData={unitDataQuery.data}
          fetchUnitData={fetchUnitData}
          closeSideBar={closeSideBar}
        />
      </article>

      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex  flex-col  ">
        <ContentSection
          unitData={unitDataQuery.data}
          sideBarOpen={sideBarOpen}
          openSideBar={openSideBar}
          unitID={unitID}
        />
      </article>
    </main>
  );
};

export default ContentPage;
