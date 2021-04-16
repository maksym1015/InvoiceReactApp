import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, formatDate } from "../utils/helpers";
import Avatar from "./Avatar";
import HR from "./HR";

export default function GeneralTile1(props) {
  let invoice = props.invoice ? props.invoice : {};

  return (
    <>
      <div className="general-tile robinhood">
        <div className="d-none d-md-block">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="pr-5 textMBold__font-size">{props.id}</h5>
              <h5 className="textMBold__font-size">
                {formatDate(invoice.due_at)}
              </h5>
            </div>
            <h3 className="textLBold__font-size">
              {formatCurrency(invoice.total)}
            </h3>
          </div>

          {/* <p className="textM__font-size">{props.title}</p> */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {invoice.line_items.map((li) => (
                <div key={li.id}>
                  <p className="mb-0 textM__font-size">{li.title}</p>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center align-self-end">
              <p className="pr-5 mb-0 textM__font-size">Status</p>
              <h4 className="font-bold mb-0 textMBold__font-size">
                {invoice.status}
              </h4>
            </div>
          </div>
          <HR />
        </div>
        <div className="d-block d-md-none" onClick={props.goTo}>
          <div className="home-item">
            {invoice.status === "paid" && (
              <span className="paid">Paid 6/28/20</span>
            )}

            <div className="item-left">
              <Avatar
                user={
                  props.page === "pay"
                    ? props.invoice.sender
                    : props.invoice.recipient
                }
                id="avatar"
              />
            </div>

            <div className="flex-fill description">
              <div className="home-item__card d-flex justify-content-between">
                <div>
                  {props.invoiceTitle}
                  <div className="more-info">
                    {/* <span className="d-inline-block mr-4">
                        Due {formatDate(props.invoice.due_at)}
                      </span> */}
                    <span>#{props.id}</span>
                  </div>
                </div>

                {props.invoiceMore}
              </div>
              <HR />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
