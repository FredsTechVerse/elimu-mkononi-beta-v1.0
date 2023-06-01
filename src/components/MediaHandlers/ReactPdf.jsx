import React, { useState, useCallback, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ReactPdfModal } from "../../components";

//CRUCIAL STYLING DEPENDENCIES
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function ReactPdf({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // ADDING RESPONSIVENESS
  const screenWidth = window.innerWidth;
  let scale = 0.7; // Default scale
  let width = 400; // Default width

  // Define breakpoints and corresponding scales
  const breakpoints = [
    { width: 480, scale: 0.5, pageWidth: 300 },
    { width: 768, scale: 0.6, pageWidth: 400 },
    { width: 1024, scale: 0.7, pageWidth: 500 },
    { width: 1200, scale: 0.8, pageWidth: 600 },
    // Add more breakpoints as needed
  ];

  // Find the matching scale for the current screen width
  breakpoints.forEach((breakpoint) => {
    if (screenWidth >= breakpoint.width) {
      width = breakpoint.pageWidth;
      scale = breakpoint.scale;
    }
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = useCallback(
    (offset) => setPageNumber((prevPageNumber) => prevPageNumber + offset),
    []
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);
  const nextPage = useCallback(() => changePage(1), [changePage]);

  useEffect(() => {
    setPageNumber(1);
  }, [pdfUrl]);
  return (
    <ReactPdfModal isModalClosed={`Hell No we are active`}>
      <div className=" flex-col-centered">
        <Document
          className="flex border-2 border-primary "
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Document is loading please wait..."
          noData="No pdf has been specified."
          error="Failed to load the pdf"
          errorTimeout={10000}
        >
          <Page
            className="m-2"
            pageNumber={pageNumber}
            width={width}
            scale={scale}
          />
        </Document>

        {/* NEW CONTROLS */}
        <div className="my-3 flex flex-row-centered ">
          <button
            type="button"
            className="button border-2 border-primary  hover:bg-blue-400  hover:text-white w-12 h-12 rounded-full flex-row-centered"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <GrPrevious />
          </button>
          <p className=" mx-4">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>

          <button
            className="button border-2 border-primary  hover:bg-blue-400 hover:text-white w-12 h-12 rounded-full flex-row-centered"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </ReactPdfModal>
  );
}

export default ReactPdf;
