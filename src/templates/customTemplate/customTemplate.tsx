import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { ChaftaCooDocument } from "../types";
import { PrintWatermark } from "../../core/PrintWatermark";

export const ExporterSection: FunctionComponent<TemplateProps<ChaftaCooDocument>> = ({ document }) => {
  const exporter = document.supplyChainConsignment?.exporter;
  const postalAddress = exporter?.postalAddress;
  return (
    <div className="border">
      <div>1. Exporter’s name, address and country:</div>
      <div>{exporter?.name}</div>
      <div>
        {postalAddress?.line1}
        {", "}
        {postalAddress?.cityName},
      </div>
      <div>
        {postalAddress?.countrySubDivisionName} {postalAddress?.postcode} {postalAddress?.countryCode}
      </div>
      <div>ABN {exporter?.iD}</div>
    </div>
  );
};

export const ProducerSection: FunctionComponent<TemplateProps<ChaftaCooDocument>> = ({ document }) => {
  const consignmentItem = document.supplyChainConsignment?.includedConsignmentItems;
  const firstConsignmentItem = consignmentItem ? consignmentItem[0] : undefined;
  const manufacturer = firstConsignmentItem?.manufacturer;
  const postalAddress = manufacturer?.postalAddress;
  return (
    <div className="border">
      <div>2. Producer’s name and address (if known):</div>
      <div>{manufacturer?.name}</div>
      <div>
        {postalAddress?.line1}
        {", "}
        {postalAddress?.cityName},
      </div>
      <div>
        {postalAddress?.countrySubDivisionName} {postalAddress?.postcode} {postalAddress?.countryCode}
      </div>
    </div>
  );
};

export const SummarySection: FunctionComponent<TemplateProps<ChaftaCooDocument>> = ({ document }) => {
  return (
    <div className="border h-100 text-center">
      <div>Certificate No.: {document.iD}</div>
      <div className="p-2">
        <div>CERTIFICATE OF ORIGIN</div>
        <div>Form for China-Australia Free Trade Agreement</div>
      </div>
      <div>Issued in: AUSTRALIA</div>
    </div>
  );
};

export const CustomTemplate: FunctionComponent<TemplateProps<ChaftaCooDocument>> = props => {
  const { document } = props;
  return (
    <div id="chafta-coo-template">
      <PrintWatermark />
      <div className="text-center">
        <h1>CERTIFICATE OF ORIGIN</h1>
      </div>
      <div className="border m-2">
        <div className="d-flex">
          <div className="w-50">
            <ExporterSection {...props} />
            <ProducerSection {...props} />
          </div>
          <div className="w-50">
            <SummarySection {...props} />
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(document, null, 2)}</pre>
    </div>
  );
};
