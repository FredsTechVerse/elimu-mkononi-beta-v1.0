import { useState } from "react";
import basicData from "../../BasicData.json";
import { TableBtn } from "../../components";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

const MovieDataTable = () => {
  const [data, setData] = useState(() => [...basicData]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
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
    <div className="p-10  w-full flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="Search"
        className="block h-8 tablet:h-8 tablet:h-10 my-2 self-end shadow-lg shadow-slate-300 border-slate-500 border-2 ring-5 rounded-md  pl-2"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className=" w-full shadow-lg ">
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
                index % 2 == 0 ? "bg-slate-300  " : ""
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

      <div className="flex gap-4 mt-5">
        <TableBtn onClick={() => table.setPageIndex(0)} text=" First page" />
        <TableBtn
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          text=" Previous page"
        />
        <TableBtn
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          text=" Next page"
        />
        <TableBtn
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          text="Last Page"
        />
      </div>
    </div>
  );
};

export default MovieDataTable;
