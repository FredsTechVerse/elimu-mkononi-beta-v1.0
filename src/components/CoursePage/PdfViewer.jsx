import React, { useState } from "react";
import { Document, Page } from "react-pdf";

async function PdfViewer({ pdf }) {
  console.log(`Pdf viewer activated ${pdf}`);

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  // const pdfStream = await ReactPDF.renderToStream(<Document />);
  // res.setHeader("Content-Type", "application/pdf");
  // pdfStream.pipe(res);
  // pdfStream.on("end", () => console.log("Done streaming, response sent."));

  return (
    <div>
      {/* <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfViewer;
