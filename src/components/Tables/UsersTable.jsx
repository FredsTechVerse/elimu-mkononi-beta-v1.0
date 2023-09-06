import React, { useState } from "react";
import basicData from "../../BasicData.json";
import { StatusPill, CTAButton, TableBtn } from "..";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const UsersTable = ({ usersQuery, role }) => {
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("surname", {
      header: () => <span>Last Name</span>,
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("contact", {
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("status", {
      cell: (info) => (
        <div className=" flex-row-centered">
          <StatusPill status={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.accessor("cta button", {
      cell: (info) => {
        const record = info.row.original;
        const userID = record._id;
        const contact = record.contact;
        return <CTAButton userID={userID} contact={contact} role={role} />;
      },
    }),
  ];

  const table = useReactTable({
    data: usersQuery.data,
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
        placeholder="Search"
        className="block h-10 my-2 self-end shadow-lg shadow-slate-300 border-slate-500 border-2 ring-5 rounded-md  pl-2"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="  w-full bg-slate-50 shadow-lg shadow-slate-200  ">
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
              } cursor-pointer text-center h-10`}
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
        {/* <TableBtn onClick={() => table.setPageIndex(0)} text=" First page" /> */}
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
        {/* <TableBtn
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          text="Last Page"
        /> */}
      </div>
    </div>
  );
};

export default UsersTable;
