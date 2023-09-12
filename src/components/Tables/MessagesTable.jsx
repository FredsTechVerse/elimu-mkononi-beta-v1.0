import React, { useState } from "react";
import { TableBtn } from "..";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const MessagesTable = ({ messagesQuery }) => {
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("recipient", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("message", {
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: messagesQuery.data,
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
        placeholder={`Search for message`}
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

export default MessagesTable;
