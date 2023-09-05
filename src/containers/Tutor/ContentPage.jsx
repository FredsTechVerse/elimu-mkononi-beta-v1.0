import React, { useEffect, useState } from "react";
import {
  Accordion,
  ContentSection,
  AccordionSkeleton,
  ContentSectionSkeleton,
} from "../../components";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { fetchUnitData, handleError } from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
const ContentPage = () => {
  const { unitID } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const unitDataQuery = useQuery(
    ["unitData", unitID],
    () => fetchUnitData({ unitID }),
    {
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

  console.log({ unitDataQuery });

  return (
    <main className="flex relative gap-1 laptop:grid laptop:grid-cols-4 w-full h-screen  overflow-y-hidden">
      <article
        className={` ${
          sideBarOpen ? "block" : "hidden"
        }  phone:w-full tablet:w-80 laptop:w-full h-full absolute laptop:relative laptop:block `}
      >
        {unitDataQuery.status === "loading" ? (
          <AccordionSkeleton />
        ) : (
          <Accordion
            unitData={unitDataQuery.data}
            fetchUnitData={fetchUnitData}
            closeSideBar={closeSideBar}
            unitID={unitID}
          />
        )}
      </article>

      <article className="w-full laptop:col-span-3 tablet:col-span-2 h-full overflow-y-auto flex  flex-col  ">
        <Outlet
          context={{
            unitDataQuery: unitDataQuery,
            sideBarOpen: sideBarOpen,
            openSideBar: openSideBar,
            unitID: unitID,
          }}
        />
      </article>
    </main>
  );
};

export default ContentPage;
