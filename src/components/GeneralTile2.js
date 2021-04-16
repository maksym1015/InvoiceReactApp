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
      <div
        className="general-tile robinhood"
        style={{ cursor: "pointer" }}
      >
        <div className="general-tile__card px-4 py-5 d-none d-md-block">
          <div className="d-flex">
            <div className="w-100">
              <div className="d-flex align-items-center mb-4">
                <Avatar
                  user={
                    props.page === "pay" ? invoice.sender : invoice.recipient
                  }
                  className="m-0 mr-4"
                />
                <span
                  className="textMBold__font-size"
                  style={{ color: "#727274" }}
                >
                  {props.page === "pay"
                    ? `${invoice.sender.first_name} ${invoice.sender.last_name}`
                    : `${invoice.recipient.first_name} ${invoice.recipient.last_name}`}
                </span>
              </div>
              <h5 className="textMBold__font-size" style={{ color: "#727274" }}>
                Due {formatDate(invoice.due_at)}
              </h5>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-end">
                <p className="pr-5 mb-0 textM__font-size">Status</p>
                <h4 className="font-bold mb-0 textMBold__font-size text-transform-uppercase">
                  {invoice.status}
                </h4>
              </div>
              <h3 className="displayS__font-size text-right font-weight-bold m-0">
                {formatCurrency(invoice.total)}
              </h3>
            </div>
          </div>
        </div>
        <div className="d-block d-md-none" onClick={props.goTo}>
          <div className="home-item">
            {invoice.status === "paid" && (
              <span className="paid">Paid {formatDate(invoice.paid_at)}</span>
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
