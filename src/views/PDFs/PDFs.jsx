import React from "react";

function PDFViewer(props) {
  return (
    <embed className="pdf-view" src={props.pdfLink} type="application/pdf" />
  );
}

export default PDFViewer;
