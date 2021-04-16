import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClock,
  faReceipt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { formatCurrency, formatDate, notify, total } from "../utils/helpers";
import { store } from "../store";
import api from "../utils/api";
import Loader from "./Loader";
import SimpleInvoice from "./invoices/SimpleInvoice";
import Avatar from "./Avatar";
import moment from "moment";

export default function ScheduleModal({
  show,
  setShow,
  event,
  user,
  services,
  setServices,
}) {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [isUserPay, setIsUserPay] = useState("");
  const [isScheduled, setIsScheduled] = useState("");
  const [date, setDate] = useState(moment().format());
  const [dueDate, setDueDate] = useState(moment().add(1, "week").format());
  const [items, setItems] = useState([]);

  const onSubmit = () => {
    // create invoice
    if (step === 5) {
      return createInvoice();
    }

    // create line items
    if (step === 4) {
      setItems(services.filter((s) => s.selected));
    }

    // service selection
    if (step === 2) {
      let items = services.filter((s) => s.selected);

      if (items.length === 0)
        return notify("Please select at least one option.", "error");
    }

    // goto next step
    setStep(step + 1);
  };

  const onServiceSelect = (service, index) => {
    let svrs = services;
    svrs[index].selected = !svrs[index].selected;

    setServices([...svrs]);
  };

  const createInvoice = () => {
    let data = {
      items,
      date,
      dueDate,
      payBy: isUserPay ? "user" : "company",
      schedule: isScheduled,
    };

    console.log(data);return;

    setDisabled(true);
    setLoading(true);

    api
      .post("silas", data)
      .then((response) => {
        console.log(response.data);

        // if (response.status === "success") {
        //   dispatch({
        //     type: "LOGGEDIN",
        //     payload: { ...state.user, sila: true },
        //   });

        //   notify(response.message);
        //   setShow(false);
        // }

        setDisabled(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);

        // notify("Error! Please try again.", "error");
        setDisabled(false);
        setLoading(false);
      });
  };

  return (
    <>
      {show && (
        <div
          className="h-100 w-100 fixed-top bg-trans-black"
          onClick={() => {
            setShow(false);
            setStep(1);
          }}
          style={{ zIndex: "1050" }}
        ></div>
      )}

      {show && (
        <div className="schedule-modal sila-modal feeds-modal register">
          {loading && <Loader />}

          <div className="header">
            {step > 1 && (
              <Link
                to="#"
                className="modal-close"
                onClick={() => setStep(step - 1)}
              >
                <span style={{ fontSize: "1.2rem" }}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </Link>
            )}

            <h3 className="pl-3">Schedule & Pay</h3>

            <Link
              to="#"
              className="modal-close"
              onClick={() => {
                setShow(false);
                setStep(1);
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </Link>
          </div>

          {step === 1 && (
            <div className="p-5">
              <div className="date-time">
                <label>Date & Time</label>
                <div className="date">
                  {formatDate(event.start, "MMMM D YYYY")}
                </div>
                <div className="time">
                  {formatDate(event.start, "HH:mm a")} -{" "}
                  {formatDate(event.end, "HH:mm a")} (PST)
                </div>
              </div>

              <button
                className="btn btn-custom"
                onClick={onSubmit}
                disabled={disabled}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="p-5">
              <h2 className="text-primary mb-5 text-center">Select Services</h2>

              {services.map((service, index) => (
                <div
                  className={
                    service.selected
                      ? "form-group-custom active"
                      : "form-group-custom"
                  }
                  key={index}
                >
                  <label className="form-check-label w-100 h-100">
                    <input
                      type="checkbox"
                      name="service"
                      checked={service.selected}
                      onChange={() => onServiceSelect(service, index)}
                    />
                    {service.name}
                  </label>
                </div>
              ))}

              <button
                className="btn btn-custom"
                onClick={onSubmit}
                disabled={disabled}
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="p-5">
              <h2 className="mb-5 text-center">Who is paying the invoice?</h2>

              <button
                className="btn btn-custom paying"
                onClick={() => {
                  setIsUserPay(true);
                  onSubmit();
                }}
              >
                I am
              </button>

              <p className="text-center">or</p>

              <button
                className="btn btn-custom paying"
                onClick={() => {
                  setIsUserPay(false);
                  onSubmit();
                }}
              >
                {user.companyName}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="p-5 d-flex justify-content-center">
              <button
                className="btn btn-custom btn-schedule"
                onClick={() => {
                  setIsScheduled(true);
                  onSubmit();
                }}
              >
                <FontAwesomeIcon icon={faClock} size="3x" />
                <span>Schedule</span>
              </button>

              <button
                className="btn btn-custom btn-invoice"
                onClick={() => {
                  setIsScheduled(false);
                  onSubmit();
                }}
              >
                <FontAwesomeIcon icon={faReceipt} size="3x" />
                <span>Send/Request Invoice</span>
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="p-5">
              <h2 className="text-center mb-3">Invoice Preview</h2>

              <div className="invoice-card mb-4">
                <div className="d-flex align-items-center mb-5">
                  <Avatar user={user} />

                  <div className="ml-4">
                    <p className="invoice-title mb-0 p-0">
                      {user.companyName ? user.companyName : user.name}
                    </p>
                    <p className="mb-0 p-0">{user.email}</p>
                  </div>
                </div>

                <div className="invoice-line-1">
                  <table className="table table-sm table-borderless">
                    <thead>
                      <tr>
                        <th>Bill to</th>
                        <th>Invoice #</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Team IFA <br />
                          info@team-ifa.com
                        </td>
                        <td>US-001</td>
                        <td>{formatDate(date, "MM/DD/YYYY")}</td>
                        <td>{formatDate(dueDate, "MM/DD/YYYY")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="invoice-line-2">
                  <table className="table table-borderless table-sm">
                    <thead className="border-bottom">
                      <tr>
                        <th>Qty</th>
                        <th>Description</th>
                        <th className="text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.qty}</td>
                          <td className="description">{item.name}</td>
                          <td className="text-right">
                            {formatCurrency(item.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-top">
                      <tr>
                        <td colSpan="3" className="text-right">
                          Total{" "}
                          <span className="font-weight-bold ml-5">
                            {formatCurrency(total(items))}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <button
                className="btn btn-custom"
                onClick={onSubmit}
                disabled={disabled}
              >
                Pay
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
