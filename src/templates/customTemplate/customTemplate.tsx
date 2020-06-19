import React, { FunctionComponent, useState } from "react";
import { format } from "date-fns";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { ChaftaCooDocument } from "../types";
import { PrintWatermark } from "../../core/PrintWatermark";

const getValue = (id?: string) => {
  if (!id) return undefined;
  const values = id.split(":");
  return values[values.length - 1];
};

const printDate = (date?: string) => {
  if (!date) return undefined;
  return format(new Date(date), "yyyy-MM-dd");
};

interface HasPrivacyToggle {
  isPrivacyOn?: boolean;
}

export const PrivacyButton = ({
  isPrivacyOn,
  handleObfuscation,
  paths
}: {
  isPrivacyOn?: boolean;
  handleObfuscation: (path: string) => void;
  paths?: string[];
}) => {
  if (!isPrivacyOn || !paths) return null;
  const hideSection = () => {
    paths.forEach(path => handleObfuscation(path));
  };
  return (
    <div className="d-inline" onClick={hideSection}>
      <i style={{ color: "red" }} className="fa fa-minus-circle" aria-hidden="true"></i>
    </div>
  );
};

export const ExporterSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document,
  handleObfuscation,
  isPrivacyOn
}) => {
  const exporter = document.supplyChainConsignment?.exporter;
  const postalAddress = exporter?.postalAddress;

  const privacyPath = ["supplyChainConsignment.exporter"];

  return (
    <div className="border">
      <div>
        1. Exporter’s name, address and country:{" "}
        <PrivacyButton isPrivacyOn={isPrivacyOn} handleObfuscation={handleObfuscation} paths={privacyPath} />
      </div>
      <div>{exporter?.name}</div>
      <div>{postalAddress?.line1}</div>
      <div>{postalAddress?.line2}</div>
      <div>{postalAddress?.cityName}</div>
      <div>
        {postalAddress?.countrySubDivisionName} {postalAddress?.postcode} {postalAddress?.countryCode}
      </div>
      <div>ABN {getValue(exporter?.iD)}</div>
    </div>
  );
};

export const ProducerSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document,
  isPrivacyOn,
  handleObfuscation
}) => {
  const consignmentItem = document.supplyChainConsignment?.includedConsignmentItems;
  const firstConsignmentItem = consignmentItem ? consignmentItem[0] : undefined;
  const manufacturer = firstConsignmentItem?.manufacturer;
  const postalAddress = manufacturer?.postalAddress;
  const privacyPath = consignmentItem?.map(
    (_item, index) => `supplyChainConsignment.includedConsignmentItems[${index}].manufacturer`
  );
  return (
    <div className="border">
      <div>
        2. Producer’s name and address (if known):{" "}
        <PrivacyButton isPrivacyOn={isPrivacyOn} handleObfuscation={handleObfuscation} paths={privacyPath} />
      </div>
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

export const SummarySection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  return (
    <div className="border h-100 text-center">
      <div>Certificate No.: {getValue(document.iD)}</div>
      <div className="p-2">
        <div>CERTIFICATE OF ORIGIN</div>
        <div>Form for China-Australia Free Trade Agreement</div>
      </div>
      <div>Issued in: AUSTRALIA</div>
    </div>
  );
};

export const OfficialUseSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  return (
    <div className="border h-100">
      <div>For official use only:</div>
    </div>
  );
};

export const ImporterSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document,
  isPrivacyOn,
  handleObfuscation
}) => {
  const importer = document.supplyChainConsignment?.importer;
  const postalAddress = importer?.postalAddress;
  const privacyPath = ["supplyChainConsignment.importer"];
  return (
    <div className="border">
      <div>
        3. Importer’s name, address and country (if known):{" "}
        <PrivacyButton isPrivacyOn={isPrivacyOn} handleObfuscation={handleObfuscation} paths={privacyPath} />
      </div>
      <div>{importer?.name}</div>
      <div>{postalAddress?.line1}</div>
      <div>{postalAddress?.line2}</div>
      <div>{postalAddress?.cityName}</div>
      <div>
        {postalAddress?.countrySubDivisionName} {postalAddress?.postcode} {postalAddress?.countryCode}
      </div>
    </div>
  );
};

export const RemarksSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  const supplyChainConsignment = document.supplyChainConsignment;
  const consignmentItems = supplyChainConsignment?.includedConsignmentItems;
  return (
    <div className="border">
      <div>5. Remarks:</div>
      <div>Consignment Ref: {getValue(supplyChainConsignment?.iD)}</div>
      <div>{supplyChainConsignment?.information}</div>
      {consignmentItems?.map((item, index) => {
        return <div key={index}>- {item.information}</div>;
      })}
    </div>
  );
};

export const TransportSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document,
  isPrivacyOn,
  handleObfuscation
}) => {
  const supplyChainConsignment = document.supplyChainConsignment;
  const loadingPortLocation = supplyChainConsignment?.loadingBaseportLocation;
  const transportMovement = supplyChainConsignment?.mainCarriageTransportMovement;
  const departureEvent = transportMovement?.departureEvent;
  const privacyPath = [
    "supplyChainConsignment.loadingBaseportLocation",
    "supplyChainConsignment.mainCarriageTransportMovement"
  ];
  return (
    <div className="border  h-100">
      <div>
        4. Means of transport and route (if known){" "}
        <PrivacyButton isPrivacyOn={isPrivacyOn} handleObfuscation={handleObfuscation} paths={privacyPath} />
      </div>
      <div>Departure Date: {printDate(departureEvent?.departureDateTime)}</div>
      <div>Vessel/Flight/Train/Vehicle No.: {getValue(transportMovement?.usedTransportMeans?.iD)}</div>
      <div>Port of loading: {getValue(loadingPortLocation?.iD)}</div>
    </div>
  );
};

interface TradeLineItemData {
  sn?: number;
  marks?: string;
  description?: string;
  code?: string;
  origin?: string;
  quantity?: string;
  invoiceNo?: string;
  invoiceDate?: string;
}

export const TradeLineItemsSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  const supplyChainConsignment = document.supplyChainConsignment;
  const consignmentItems = supplyChainConsignment?.includedConsignmentItems;

  const lineItems: TradeLineItemData[] = [];

  consignmentItems?.forEach(consignmentItem => {
    const { tradeLineItems } = consignmentItem;
    tradeLineItems.forEach(tradeLineItem => {
      let firstLineItem = true;
      const { transportPackages, tradeProduct } = tradeLineItem;
      transportPackages?.forEach(transportPackage => {
        function showIfFirstItemInTradeLineItem<T>(value: T): T | undefined {
          if (firstLineItem) return value;
        }
        lineItems.push({
          sn: showIfFirstItemInTradeLineItem(tradeLineItem.sequenceNumber),
          marks: getValue(transportPackage.iD),
          description: showIfFirstItemInTradeLineItem(tradeProduct?.description),
          code: showIfFirstItemInTradeLineItem(tradeProduct?.harmonisedTariffCode?.classCode),
          origin: showIfFirstItemInTradeLineItem(consignmentItem.crossBorderRegulatoryProcedure.originCriteriaText),
          quantity: `${transportPackage.grossVolume}, ${transportPackage.grossWeight}`,
          invoiceDate: printDate(tradeLineItem.invoiceReference?.formattedIssueDateTime),
          invoiceNo: getValue(tradeLineItem.invoiceReference?.iD)
        });
        firstLineItem = false;
      });
    });
  });

  return (
    <div className="border">
      <table>
        <thead>
          <tr>
            <th>6. Item number (max. 20)</th>
            <th>7. Marks and numbers on packages (optional)</th>
            <th>8. Number and kind of packages; description of goods</th>
            <th>9. HS code (6 digit code)</th>
            <th>10. Origin criterion</th>
            <th>11. Gross or net weight or other quantity (e.g. Quantity Unit, litres, m³.)</th>
            <th>12. Invoice number and date</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((line, index) => (
            <tr key={index}>
              <td>{line.sn}</td>
              <td>{line.marks}</td>
              <td>{line.description}</td>
              <td>{line.code}</td>
              <td>{line.origin}</td>
              <td>{line.quantity}</td>
              <td>
                <div>{line.invoiceNo}</div>
                <div>{line.invoiceDate}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DeclarationSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  const importer = document.supplyChainConsignment?.importer;
  const { firstSignatoryAuthentication, supplyChainConsignment } = document;
  return (
    <div className="border h-100">
      <div>
        13. Declaration by the exporter or producer The undersigned hereby declares that the above-stated information is
        correct and that the goods exported to
      </div>

      <div className="text-center my-4">
        <div>{importer?.name}</div>
        <hr />
        <div>(Importing Party)</div>
      </div>

      <div className="my-4">
        comply with the origin requirements specified in the ChinaAustralia Free Trade Agreement.
      </div>
      <div className="my-2">
        {supplyChainConsignment?.loadingBaseportLocation?.name},{" "}
        {printDate(firstSignatoryAuthentication?.actualDateTime)}
      </div>
      <div className="text-center">
        <img className="w-50" src={firstSignatoryAuthentication?.signature}></img>
      </div>
      <div>Place, date and signature of authorised person</div>
    </div>
  );
};

export const CertificationSection: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = ({
  document
}) => {
  const importer = document.supplyChainConsignment?.importer;
  const { secondSignatoryAuthentication, supplyChainConsignment } = document;
  return (
    <div className="border h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div>14. Certification</div>
        <div className="text-center">
          <img className="w-50" src={secondSignatoryAuthentication?.signature}></img>
        </div>
        <div>Place, date and signature of authorised person</div>
      </div>
    </div>
  );
};

export const CustomTemplate: FunctionComponent<TemplateProps<ChaftaCooDocument> & HasPrivacyToggle> = props => {
  const [isPrivacyOn, setIsPrivacyOn] = useState(false);
  const { document } = props;

  return (
    <div id="chafta-coo-template" style={{ fontSize: "0.8em" }} className="container">
      <PrintWatermark />
      <div className="p-2">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="privacySwitch"
            checked={isPrivacyOn}
            onChange={e => setIsPrivacyOn(e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="privacySwitch">
            Privacy Filter
          </label>
        </div>
      </div>
      <div className="text-center mt-4">
        <h1 style={{ fontSize: "0.9em", fontWeight: "bolder" }}>CERTIFICATE OF ORIGIN</h1>
      </div>
      <div className="border m-2">
        <div className="d-flex">
          <div className="w-50">
            <ExporterSection {...props} isPrivacyOn={isPrivacyOn} />
            <ProducerSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
          <div className="w-50">
            <SummarySection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
        </div>
        <div className="d-flex">
          <div className="w-50">
            <ImporterSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
          <div className="w-50">
            <OfficialUseSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
        </div>
        <div className="d-flex">
          <div className="w-50">
            <TransportSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
          <div className="w-50">
            <RemarksSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
        </div>
        <div>
          <TradeLineItemsSection {...props} isPrivacyOn={isPrivacyOn} />
        </div>
        <div className="d-flex">
          <div className="w-50">
            <DeclarationSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
          <div className="w-50">
            <CertificationSection {...props} isPrivacyOn={isPrivacyOn} />
          </div>
        </div>
      </div>
    </div>
  );
};
