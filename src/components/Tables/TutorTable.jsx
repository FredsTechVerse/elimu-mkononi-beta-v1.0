import React, { useState } from "react";
import { TableBtn } from "..";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { PencilIcon } from "@heroicons/react/24/solid";

const TutorTable = ({ tutorQuery }) => {
  console.log({ tutorQuery: tutorQuery.data });
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const roles = localStorage.getItem("roles");
  const location = useLocation();
  const columns = [
    columnHelper.accessor("unitName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("chapters", {
      header: () => <span>Chapters</span>,
      cell: (info) => {
        const record = info.row.original;
        console.log({ record });
        const numberOfChapters = record?.unitChapters?.length;
        return <span>{numberOfChapters}</span>;
      },
    }),

    columnHelper.accessor("lessons", {
      cell: (info) => {
        const record = info.row.original;
        let numberOfLessons = 0;
        record.unitChapters.forEach((chapter) => {
          numberOfLessons += chapter.chapterLessons.length;
        });
        return <span>{numberOfLessons}</span>;
      },
    }),

    columnHelper.accessor("cta", {
      cell: (info) => {
        const record = info.row.original;
        const unitID = record._id;
        return (
          <div className="flex-row-centered gap-2 z-10">
            <button
              className={`cta-btn group ${
                roles?.includes("EM-201") && "hidden"
              }`}
              onClick={() => {
                navigate("/new-unit", {
                  state: { unitID, background: location },
                });
              }}
            >
              <PencilIcon className="icon-styling h-4  text-white" />
            </button>
            <Link
              to={`/unit/${unitID}`}
              className="bg-slate-700 text-white rounded-full px-5 py-0.5"
            >
              View
            </Link>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: tutorQuery.data.units,
    columns,
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  return (
    <div className="py-5 phone:hidden tablet:table w-full flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder={`Search for unit`}
        className="block h-10 rounded-md my-2 shadow-md shadow-slate-300 border-slate-400 border-1 text-start w-48"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="  w-full bg-slate-50 shadow-lg shadow-slate-200 rounded-lg overflow-hidden  ">
        <thead className=" uppercase h-12 bg-slate-600 text-white  ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 !== 0 && "bg-slate-300"
              } cursor-pointer text-center h-8 tablet:h-10`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center capitalize ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-5  justify-end">
        <TableBtn
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          text=" Previous"
        />
        <TableBtn
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          text=" Next"
        />
      </div>
    </div>
  );
};

export default TutorTable;
