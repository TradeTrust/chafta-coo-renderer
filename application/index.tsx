import ReactDOM from "react-dom";
import pdfOnly from "../tmp/pdf.json";
import React from "react";
import { App } from "./app";

ReactDOM.render(
  <App
    documents={[
      { name: "PDF Only", document: pdfOnly },
    ]}
  />,
  document.getElementById("root")
);
