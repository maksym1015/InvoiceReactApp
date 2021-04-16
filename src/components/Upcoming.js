import React, { useState } from "react";
import { formatCurrency, formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import HR from "./HR";
import Modal from "./Modal";

export default function Upcoming(props) {
  const [modal, setModal] = useState(false);
  const [invoiceDropdown, setInvoiceDropdown] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const DIV = (upcomings) => {
    return (
      <div>
        {upcomings.map((upcoming) => {
          return (
            <div
              className="upcoming__item font-normal font-md-bold cursor-pointer"
              key={upcoming.id}
              onClick={() => setModal(!modal)}
            >
              <div className="textSBold__font-size">
                {formatDate(upcoming.created_at, "MM/DD")}
              </div>
              <div className="flex-grow-1 textSBold__font-size white-space-nowrap overflow-hidden text-overflow-ellipsis text-md-xs ml-5 max-width-xl-150-px">
                {upcoming.is_quick
                  ? upcoming.title
                  : upcoming.line_items[0]
                  ? upcoming.line_items[0].title
                  : ""}
              </div>
              <div className="text-success textSBold__font-size font-bold ml-5">
                {formatCurrency(upcoming.total)}
              </div>
              {/* <div
                className={`${
                  upcoming.status === "paid" ? "text-success" : "text-danger"
                } textSBold__font-size font-bold`}
              >
                {formatCurrency(upcoming.total)}
              </div> */}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="upcoming__status text-white d-md-none">
        {props.upcomings.length}
      </div>
      <div className="upcoming mx-auto bg-white position-xl-fixed">
        <div className="container-fluid">
          <div className="upcoming__header textMBold__font-size">Upcoming</div>
          <div className="row">
            <HR className="m-0 d-none d-xl-block" />
          </div>
          {DIV(props.upcomings)}
        </div>
      </div>

      <Modal show={modal} hideModal={handleModal} maxWidth="80rem">
        <div className="home-view-invoice invoice-details position-relative m-2">
          <div className="page-title text-center displayM__font-size font-weight-bold">
            INVOICE DETAILS
          </div>

          <div>
            <div className="d-flex flex-column flex-lg-row justify-content-around py-5">
              <div className="d-flex align-items-center flex-fill">
                <Avatar className="m-0 mr-4" user="M" />
                <span className="displayS__font-size font-weight-bold cursor-pointer w-50 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                  Team IFA
                </span>
              </div>
              <div className="d-flex justify-content-center justify-lg-content-end align-items-lg-end">
                <div class="invoice-dropdown">
                  <a
                    class="btn textLBold__font-size"
                    onClick={() => setInvoiceDropdown(!invoiceDropdown)}
                  >
                    Actions
                    <span className="float-right">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </a>

                  {invoiceDropdown && (
                    <div class="invoice-dropdown__menu">
                      <a class="invoice-dropdown-item">Action</a>
                      <a class="invoice-dropdown-item">Action</a>
                      <a class="invoice-dropdown-item">Action</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="invoice-details__table mb-4">
                <div className="invoice-details__table__first d-flex">
                  <div className="invoice-details__table__first--left p-5">
                    <div className="textL__font-size">
                      <h4 className="textL__font-size">Vendor name</h4>
                      <p>Coral Lab</p>
                    </div>
                    <div className="textL__font-size">
                      <h4 className="textL__font-size">Due date</h4>
                      <p>Mar 18, 2021</p>
                    </div>
                    <div className="textL__font-size">
                      <h4 className="textL__font-size">Bill #</h4>
                      <p>234085</p>
                    </div>
                  </div>
                  <div className="flex-fill invoice-details__table__first--right p-5">
                    <table className="w-100 textS__font-size">
                      <thead>
                        <th className="w-25 pb-2">
                          <u>Qty</u>
                        </th>
                        <th className="w-100 pb-2">
                          <u>Description</u>
                        </th>
                        <th className="pb-2">
                          <u>Price</u>
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.0</td>
                          <td>Web Development Services</td>
                          <td className="text-right">100.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="invoice-details__table__second d-flex align-items-center justify-content-between displayS__font-size px-5 py-4">
                  <span>Total to pay</span>
                  <span className="font-weight-bold">$210.47</span>
                </div>
              </div>

              <div className="btn-cta bg-white">
                <button className="w-100 btn btn-custom">
                  Schedule this payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
