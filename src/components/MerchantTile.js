import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, formatDate } from "../utils/helpers";

export default function MerchantTile(props) {
  let invoice = props.item;
  let status = invoice.status === "paid" ? "success" : "danger";

  return (
    <div className="merchant--tile">
      <div className="d-none d-xl-block">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="textMBold__font-size text-transform-uppercase">
              {invoice.title}
            </h5>
            <h5 className="textM__font-size">
              {formatDate(invoice.due_at, "MM/DD/YYYY")}
            </h5>
          </div>

          <div className="flex-fill ml-5">
            {invoice.line_items.map((li) => (
              <div key={li.id}>
                <p className="textM__font-size">
                  {li.title}
                </p>
                {/* <p className="textM__font-size">
                  {li.description}
                </p> */}
              </div>
            ))}
          </div>

          <div>
            <h4 className="textLBold__font-size mb-0 ">
              {formatCurrency(invoice.total)}
            </h4>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <div>
            <span className="textMBold__font-size mr-4">
              Status
            </span>
            <span
              className="textMBold__font-size text-transform-uppercase"
            >
              {invoice.status}
            </span>
          </div>
        </div>
      </div>
      <div className="d-block d-xl-none">
        {/* <a className="merchant--tile-anchor"> */}
          <div className="d-flex justify-content-between align-items-center">
            <p className="textM__font-size mb-0">
              {formatDate(invoice.due_at, "MM/DD/YYYY")}
            </p>
            <p className="text-transform-uppercase textMBold__font-size mb-0">
              {invoice.status}
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <p className="pr-4 textL__font-size mb-0">
                {formatCurrency(invoice.total)}
              </p>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        {/* </a> */}
      </div>
    </div>
  );
}
