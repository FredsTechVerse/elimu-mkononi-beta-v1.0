import React from "react";
import { StatusPill, CTAUnitButtonAdmin, NavigateBtn } from "..";
const UnitsAdminTable = () => {
  const unitsData = [
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
    {
      unitCode: "SMA 2173",
      unitName: "CALCULUS I",
      unitType: "paid",
      unitChapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      tutor: [
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
        {
          fName: "JANET",
          surname: "NDICHU",
          contact: "254122657095",
          email: "lorem5@gmail.com",
          status: "active",
          units: ["unit 1", "unit 2", "unit 3"],
          _id: { $oid: "634513b7b32aff941eef9f46" },
          entryDate: { $date: "2022-10-11T06:56:55.877Z" },
          updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
        },
      ],
      _id: { $oid: "634513b7b32aff941eef9f46" },
      entryDate: { $date: "2022-10-11T06:56:55.877Z" },
      updatedAt: { $date: "2022-10-11T06:56:55.877Z" },
    },
  ];

  return (
    <>
      <div className="flex flex-col align-center relative shadow-md phone:rounded-lg w-full h-full py-2 ">
        <div className="flex w-full items-center justify-end mb-3 pr-1">
          <NavigateBtn
            destination="new-tutor"
            text="New Unit"
            icon="tenantIcon"
          />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-cyan-50">
            <thead className="text-secondary flex w-full items-center justify-center uppercase h-full">
              <tr className="flex w-full items-center justify-center px-2 bg-slate-500 h-12">
                <th className="flex w-16 px-2 ">No</th>
                <th className="justify-center items-start flex py-2 w-48">
                  Unit Code
                </th>
                <th className="justify-center items-center  flex py-2 w-64">
                  Unit Name
                </th>
                <th className="justify-center items-center  flex py-2 w-64">
                  Tutor
                </th>
                <th className="justify-center items-center  flex py-2 w-48">
                  Chapters
                </th>
                <th className="justify-center items-center flex py-2 w-48">
                  Type
                </th>
                <th className="flex py-2 w-64 justify-center items-center">
                  CTA
                </th>
              </tr>
            </thead>

            <tbody className="flex flex-col w-full items-center justify-start">
              {unitsData.map((tutorData, index) => {
                let {
                  unitCode,
                  unitName,
                  unitType,
                  unitChapters,
                  tutor,
                  _id,
                  email,
                } = tutorData;
                let tutorName = `${tutor[0].fName} ${tutor[0].surname}`;
                let chaptersNo = unitChapters.length;
                return (
                  <tr
                    className={`${
                      index % 2 == 0 ? "bg-cyan-100  " : ""
                    } flex w-full items-center justify-start px-2 cursor-pointer font-normal text-xl`}
                    key={`tutor-${index}`}
                  >
                    <td className="py-1 px-2 w-16 justify-center">{`${
                      index + 1
                    }`}</td>
                    <td className="py-1 w-48  flex justify-center items-center">
                      {unitCode}
                    </td>
                    <td className="py-1 w-64  flex justify-center items-center">
                      {unitName}
                    </td>
                    <td className="py-1 w-56   flex justify-center items-center truncate capitalize">
                      <p>{tutorName}</p>
                    </td>
                    <td className="py-1 w-48   flex justify-center items-center truncate">
                      {chaptersNo}
                    </td>
                    <td className="py-1 w-48  flex justify-center items-center ">
                      <StatusPill status={unitType} />
                    </td>
                    <td className="py-1 w-64 ">
                      <CTAUnitButtonAdmin _id={_id} contact={email} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UnitsAdminTable;
